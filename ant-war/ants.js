function spawnAnt(type) {
  ants.push({
    x: queen.x,
    y: queen.y,
    type,
    speed: type === "soldier" ? 1.8 : 2.2,
    hp: type === "soldier" ? 60 : 25,
    angle: 0,
    carrying: false,
    dead: false
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

    // SOLDIERS (FIXED FULL AI TARGETING)
    if (a.type === "soldier") {

      let target = findNearestEnemy(a.x, a.y, "player");

      if (target && target.ref) {

        let dx = target.x - a.x;
        let dy = target.y - a.y;
        let d = Math.hypot(dx, dy);

        a.angle = Math.atan2(dy, dx);

        if (d < 10) {
          target.ref.hp -= 1;

          if (target.ref.hp <= 0) {
            target.ref.dead = true;
          }

        } else {
          a.x += Math.cos(a.angle) * a.speed;
          a.y += Math.sin(a.angle) * a.speed;
        }
      }

      continue;
    }

    // WORKERS
    if (!a.carrying) {

      let t = findClosestFood(a.x, a.y);
      if (!t) continue;

      let dx = t.x - a.x;
      let dy = t.y - a.y;
      let d = Math.hypot(dx, dy);

      a.angle = Math.atan2(dy, dx);

      if (d < 6) {
        let i = food.indexOf(t);
        if (i !== -1) food.splice(i, 1);
        a.carrying = true;
      } else {
        a.x += Math.cos(a.angle) * a.speed;
        a.y += Math.sin(a.angle) * a.speed;
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

  ants = ants.filter(a => a.hp > 0 && !a.dead);
}