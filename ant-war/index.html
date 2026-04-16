<!DOCTYPE html>
<html>
<head>
  <title>Ant War Lite</title>
  <style>
    body { margin: 0; background: #111; overflow: hidden; }
    canvas { display: block; }
  </style>
</head>
<body>
<canvas id="game"></canvas>

<script>
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ants = [];
let enemies = [];
let food = [];

let playerFood = 0;

let queen = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  hp: 100
};

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Spawn food
for (let i = 0; i < 50; i++) {
  food.push({ x: rand(0, canvas.width), y: rand(0, canvas.height) });
}

// Spawn ant
function spawnAnt() {
  ants.push({
    x: queen.x,
    y: queen.y,
    speed: rand(1, 2),
    carrying: false,
    target: null,
    hp: 20
  });
}

// Spawn enemy
function spawnEnemy() {
  enemies.push({
    x: rand(0, canvas.width),
    y: rand(0, canvas.height),
    speed: rand(1, 1.5),
    hp: 25
  });
}

// Mouse movement
let mouse = { x: queen.x, y: queen.y };
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Click to spawn ants
window.addEventListener("click", () => {
  if (playerFood > 0) {
    spawnAnt();
    playerFood--;
  }
});

// Game loop
let enemyTimer = 0;

function update() {
  // Move queen
  queen.x += (mouse.x - queen.x) * 0.05;
  queen.y += (mouse.y - queen.y) * 0.05;

  // Spawn enemies
  enemyTimer++;
  if (enemyTimer > 120) {
    spawnEnemy();
    enemyTimer = 0;
  }

  // Ant logic
  ants.forEach(ant => {
    if (ant.hp <= 0) return;

    if (!ant.carrying) {
      if (!ant.target && food.length > 0) {
        ant.target = food[Math.floor(Math.random() * food.length)];
      }

      if (ant.target) {
        let dx = ant.target.x - ant.x;
        let dy = ant.target.y - ant.y;
        let d = Math.hypot(dx, dy);

        if (d < 5) {
          ant.carrying = true;
          food = food.filter(f => f !== ant.target);
          ant.target = null;
        } else {
          ant.x += dx / d * ant.speed;
          ant.y += dy / d * ant.speed;
        }
      }
    } else {
      let dx = queen.x - ant.x;
      let dy = queen.y - ant.y;
      let d = Math.hypot(dx, dy);

      if (d < 10) {
        ant.carrying = false;
        playerFood++;
      } else {
        ant.x += dx / d * ant.speed;
        ant.y += dy / d * ant.speed;
      }
    }
  });

  // Enemy logic
  enemies.forEach(e => {
    let target = queen;
    let minDist = dist(e, queen);

    ants.forEach(a => {
      let d = dist(e, a);
      if (d < minDist) {
        minDist = d;
        target = a;
      }
    });

    let dx = target.x - e.x;
    let dy = target.y - e.y;
    let d = Math.hypot(dx, dy);

    if (d > 0) {
      e.x += dx / d * e.speed;
      e.y += dy / d * e.speed;
    }

    if (d < 10) {
      if (target === queen) {
        queen.hp -= 0.1;
      } else {
        target.hp -= 0.3;
      }
    }
  });
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Food
  ctx.fillStyle = "lime";
  food.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Ants
  ctx.fillStyle = "white";
  ants.forEach(a => {
    ctx.beginPath();
    ctx.arc(a.x, a.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Enemies
  ctx.fillStyle = "red";
  enemies.forEach(e => {
    ctx.beginPath();
    ctx.arc(e.x, e.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Queen
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(queen.x, queen.y, 10, 0, Math.PI * 2);
  ctx.fill();

  // UI
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Food: " + playerFood, 10, 20);
  ctx.fillText("Ants: " + ants.length, 10, 40);
  ctx.fillText("HP: " + Math.floor(queen.hp), 10, 60);
}

function loop() {
  update();
  draw();

  if (queen.hp > 0) {
    requestAnimationFrame(loop);
  } else {
    alert("Game Over");
  }
}

loop();
</script>
</body>
</html>