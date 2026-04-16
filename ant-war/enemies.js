let enemyColonies = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnColony(x, y) {
  enemyColonies.push({
    queen: { x, y, hp: 120, cooldown: 120 },
    workers: [],
    soldiers: [],
    targetX: x,
    targetY: y
  });
}

for (let i = 0; i < 5; i++) {
  spawnColony(rand(0, WORLD_SIZE), rand(0, WORLD_SIZE));
}

function updateEnemies() {

  for (let c of enemyColonies) {

    if (!c.workers) c.workers = [];
    if (!c.soldiers) c.soldiers = [];

    c.queen.cooldown--;

    // spawn workers
    if (c.queen.cooldown <= 0) {
      c.workers.push({
        x: c.queen.x,
        y: c.queen.y,
        speed: 1.8,
        hp: 25,
        angle: 0,
        carrying: false,
        dead: false
      });
      c.queen.cooldown = 90;
    }

    // spawn soldiers
    if (Math.random() < 0.003) {
      c.soldiers.push({
        x: c.queen.x,
        y: c.queen.y,
        speed: 1.7,
        hp: 60,
        angle: 0,
        dead: false
      });
    }

    // queen movement (expansion AI)
    if (Math.random() < 0.01) {
      c.targetX = c.queen.x + rand(-400, 400);
      c.targetY = c.queen.y + rand(-400, 400);
    }

    c.queen.x += (c.targetX - c.queen.x) * 0.002;
    c.queen.y += (c.targetY - c.queen.y) * 0.002;

    // WORKERS
    for (let w of c.workers) {

      let t = findClosestFood(w.x, w.y);
      if (!t) continue;

      let dx = t.x - w.x;
      let dy = t.y - w.y;
      let d = Math.hypot(dx, dy);

      w.angle = Math.atan2(dy, dx);

      if (d < 6) {
        let i = food.indexOf(t);
        if (i !== -1) food.splice(i, 1);
        w.carrying = true;
      } else {
        w.x += Math.cos(w.angle) * w.speed;
        w.y += Math.sin(w.angle) * w.speed;
      }
    }

    // SOLDIERS (FULL AI SYSTEM)
    for (let s of c.soldiers) {

      let target = findNearestEnemy(s.x, s.y, "enemy");

      if (target && target.ref) {

        let dx = target.x - s.x;
        let dy = target.y - s.y;
        let d = Math.hypot(dx, dy);

        s.angle = Math.atan2(dy, dx);

        if (d < 10) {
          target.ref.hp -= 0.8;

          if (target.ref.hp <= 0) {
            target.ref.dead = true;
          }

        } else {
          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
        }
      }
    }

    c.workers = c.workers.filter(w => w.hp > 0 && !w.dead);
    c.soldiers = c.soldiers.filter(s => s.hp > 0 && !s.dead);
  }
}