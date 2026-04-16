import pygame
import random
import math
import sys

# ------------------------
# Setup
# ------------------------
pygame.init()

WIDTH, HEIGHT = 1000, 700
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Ant War Lite - Singleplayer")

clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 20)

# ------------------------
# Helpers
# ------------------------
def distance(a, b):
    return math.hypot(a[0] - b[0], a[1] - b[1])

def clamp(v, min_v, max_v):
    return max(min_v, min(v, max_v))

# ------------------------
# Entities
# ------------------------
ants = []
enemy_ants = []
food = []

player_food = 0

# ------------------------
# Player Queen
# ------------------------
queen = {
    "x": WIDTH // 2,
    "y": HEIGHT // 2,
    "size": 18,
    "color": (50, 200, 255),
    "hp": 100
}

# ------------------------
# Spawn initial food
# ------------------------
for _ in range(40):
    food.append([random.randint(0, WIDTH), random.randint(0, HEIGHT)])

# ------------------------
# Ant class (simple dict-based)
# ------------------------
def spawn_ant(x, y):
    ants.append({
        "x": x,
        "y": y,
        "speed": random.uniform(1.2, 2.0),
        "target": None,
        "carrying": False,
        "hp": 20
    })

def spawn_enemy():
    enemy_ants.append({
        "x": random.randint(0, WIDTH),
        "y": random.randint(0, HEIGHT),
        "speed": random.uniform(1.0, 1.8),
        "target": None,
        "hp": 25
    })

# ------------------------
# Game loop
# ------------------------
enemy_timer = 0
running = True

while running:
    dt = clock.tick(60)

    screen.fill((25, 25, 30))

    # ------------------------
    # Events
    # ------------------------
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        # Click to spawn ants
        if event.type == pygame.MOUSEBUTTONDOWN:
            if player_food >= 1:
                mx, my = pygame.mouse.get_pos()
                spawn_ant(queen["x"], queen["y"])
                player_food -= 1

    # ------------------------
    # Queen follows mouse
    # ------------------------
    mx, my = pygame.mouse.get_pos()
    queen["x"] += (mx - queen["x"]) * 0.08
    queen["y"] += (my - queen["y"]) * 0.08

    # ------------------------
    # Spawn enemies over time
    # ------------------------
    enemy_timer += 1
    if enemy_timer > 120:
        spawn_enemy()
        enemy_timer = 0

    # ------------------------
    # Food rendering
    # ------------------------
    for f in food:
        pygame.draw.circle(screen, (0, 255, 100), (f[0], f[1]), 5)

    # ------------------------
    # Player ants logic
    # ------------------------
    for ant in ants:
        if ant["hp"] <= 0:
            ants.remove(ant)
            continue

        # find food if not carrying
        if not ant["carrying"]:
            if ant["target"] is None or ant["target"] not in food:
                ant["target"] = random.choice(food) if food else None

            if ant["target"]:
                tx, ty = ant["target"]
                dx, dy = tx - ant["x"], ty - ant["y"]
                dist = math.hypot(dx, dy)

                if dist < 6:
                    ant["carrying"] = True
                    if ant["target"] in food:
                        food.remove(ant["target"])
                    ant["target"] = None
                else:
                    ant["x"] += (dx / dist) * ant["speed"]
                    ant["y"] += (dy / dist) * ant["speed"]

        else:
            # return to queen
            dx, dy = queen["x"] - ant["x"], queen["y"] - ant["y"]
            dist = math.hypot(dx, dy)

            if dist < 10:
                ant["carrying"] = False
                player_food += 1
            else:
                ant["x"] += (dx / dist) * ant["speed"]
                ant["y"] += (dy / dist) * ant["speed"]

        pygame.draw.circle(screen, (200, 200, 200), (int(ant["x"]), int(ant["y"])), 4)

    # ------------------------
    # Enemy ants logic
    # ------------------------
    for e in enemy_ants:
        if e["hp"] <= 0:
            enemy_ants.remove(e)
            continue

        # chase nearest player ant or queen
        target = queen
        min_dist = distance((e["x"], e["y"]), (queen["x"], queen["y"]))

        for ant in ants:
            d = distance((e["x"], e["y"]), (ant["x"], ant["y"]))
            if d < min_dist:
                min_dist = d
                target = ant

        dx, dy = target["x"] - e["x"], target["y"] - e["y"]
        dist = math.hypot(dx, dy)

        if dist > 0:
            e["x"] += (dx / dist) * e["speed"]
            e["y"] += (dy / dist) * e["speed"]

        # attack
        if dist < 10:
            if target == queen:
                queen["hp"] -= 0.2
            else:
                target["hp"] -= 0.5

        pygame.draw.circle(screen, (255, 80, 80), (int(e["x"]), int(e["y"])), 5)

    # ------------------------
    # Draw queen
    # ------------------------
    pygame.draw.circle(screen, queen["color"], (int(queen["x"]), int(queen["y"])), queen["size"])

    # ------------------------
    # UI
    # ------------------------
    text1 = font.render(f"Food: {player_food}", True, (255, 255, 255))
    text2 = font.render(f"Ants: {len(ants)}", True, (255, 255, 255))
    text3 = font.render(f"Queen HP: {int(queen['hp'])}", True, (255, 255, 255))

    screen.blit(text1, (10, 10))
    screen.blit(text2, (10, 35))
    screen.blit(text3, (10, 60))

    pygame.display.flip()

    # ------------------------
    # Game over
    # ------------------------
    if queen["hp"] <= 0:
        running = False

# ------------------------
# End screen
# ------------------------
screen.fill((0, 0, 0))
end = font.render("GAME OVER - Your colony died", True, (255, 80, 80))
screen.blit(end, (WIDTH//2 - 160, HEIGHT//2))
pygame.display.flip()

pygame.time.delay(3000)
pygame.quit()
sys.exit()