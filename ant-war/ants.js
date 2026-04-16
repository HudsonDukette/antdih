let ants = [];
let playerFood = 10;

let queen = {
  x: WORLD_SIZE / 2,
  y: WORLD_SIZE / 2,
  hp: 100,
  energy: 100,
  speed: 3,
  segments: 3
};

function spawnAnt(type) {
  ants.push({
    x: queen.x,
    y: queen.y,
    type,
    speed: type === "soldier" ? 1.8 : 2.2,
    target: null,
    carrying: false,
    hp: type === "soldier" ? 60 : 25,
    energy: 100,
    angle: 0
  });
}

function getClosest(arr, x, y) {
  let best = null;
  let dBest = Infinity;

  for (let a of arr) {
    let d = Math.hypot(a.x - x, a.y - y);
    if (d < dBest) {
      dBest = d;
      best = a;
    }
  }
  return best;
}

function updateAnts() {

  for (let a of ants) {

    // ENERGY SYSTEM
    a.energy -= 0.02;

    if (a.energy <= 0) {
      a.hp -= 0.1;
    }

    // SOLDIERS → ENEMIES ONLY (FIXED)
    if (a.type === "soldier") {

      let target = getClosest(enemies, a.x, a.y);

      if (target) {
        let dx = target.x - a.x;
        let dy = target.y - a.y;
        let d = Math.hypot(dx, dy);

        a.angle = Math.atan2(dy, dx);

        if (d < 10) {
          target.hp -= 0.8;
        } else {
          a.x += Math.cos(a.angle) * a.speed;
          a.y += Math.sin(a.angle) * a.speed;
        }
      }

      continue;
    }

    // WORKERS → FOOD
    if (!a.carrying) {
      a.target = getClosest(food, a.x, a.y);

      if (a.target) {
        let dx = a.target.x - a.x;
        let dy = a.target.y - a.y;
        let d = Math.hypot(dx, dy);

        a.angle = Math.atan2(dy, dx);

        if (d < 6) {
          a.carrying = true;
          food = food.filter(f => f !== a.target);
        } else {
          a.x += Math.cos(a.angle) * a.speed;
          a.y += Math.sin(a.angle) * a.speed;
        }
      }

    } else {
      let dx = queen.x - a.x;
      let dy = queen.y - a.y;
      let d = Math.hypot(dx, dy);

      a.angle = Math.atan2(dy, dx);

      if (d < 10) {
        a.carrying = false;
        playerFood++;
        queen.energy = Math.min(100, queen.energy + 5);
      } else {
        a.x += Math.cos(a.angle) * a.speed;
        a.y += Math.sin(a.angle) * a.speed;
      }
    }
  }

  ants = ants.filter(a => a.hp > 0);
}