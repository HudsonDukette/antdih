let ants = [];
let playerFood = 5;

let queen = {
  x: WORLD_SIZE / 2,
  y: WORLD_SIZE / 2,
  speed: 3,
  hp: 100
};

function spawnAnt(type) {
  ants.push({
    x: queen.x,
    y: queen.y,
    type,
    speed: type === "soldier" ? 1.6 : 2.3,
    carrying: false,
    target: null,
    angle: 0,
    hp: type === "soldier" ? 50 : 20
  });
}

function findClosestFood(x, y) {
  let best = null;
  let bestD = Infinity;

  for (let f of food) {
    let d = Math.hypot(f.x - x, f.y - y);
    if (d < bestD) {
      bestD = d;
      best = f;
    }
  }
  return best;
}

function updateAnts() {
  for (let a of ants) {

    // choose target intelligently
    if (!a.carrying) {
      a.target = findClosestFood(a.x, a.y);

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
      } else {
        a.x += Math.cos(a.angle) * a.speed;
        a.y += Math.sin(a.angle) * a.speed;
      }
    }
  }

  ants = ants.filter(a => a.hp > 0);
}