let ants = [];
let playerFood = 10;

function spawnAnt(type) {
  ants.push({
    x: queen.x,
    y: queen.y,
    type,
    speed: type === "soldier" ? 1.8 : 2.2,
    hp: type === "soldier" ? 60 : 25,
    angle: 0,
    carrying: false
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

function findClosestEnemy(x, y) {
  let best = null;
  let bestD = Infinity;

  for (let e of enemies) {
    let d = Math.hypot(e.x - x, e.y - y);
    if (d < bestD) {
      bestD = d;
      best = e;
    }
  }
  return best;
}

function updateAnts() {
  for (let a of ants) {

    // WORKERS
    if (a.type !== "soldier") {

      if (!a.carrying) {
        let target = findClosestFood(a.x, a.y);

        if (target) {
          let dx = target.x - a.x;
          let dy = target.y - a.y;
          let d = Math.hypot(dx, dy);

          a.angle = Math.atan2(dy, dx);

          if (d < 6) {
            a.carrying = true;
            let i = food.indexOf(target);
            if (i !== -1) food.splice(i, 1);
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

    // SOLDIERS
    else {
      let target = findClosestEnemy(a.x, a.y);

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
    }
  }

  ants = ants.filter(a => a.hp > 0);
}