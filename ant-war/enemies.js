let enemyColonies = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function spawnColony(x, y) {
  enemyColonies.push({
    queen: { x, y, hp: 120, cooldown: 120 },
    workers: [],
    soldiers: [],
    age: 0
  });
}

for (let i = 0; i < 5; i++) {
  spawnColony(rand(0, WORLD_SIZE), rand(0, WORLD_SIZE));
}

function updateEnemies() {

  for (let c of enemyColonies) {

    if (!c.workers) c.workers = [];
    if (!c.soldiers) c.soldiers = [];

    c.age++;
    c.queen.cooldown--;

    if (c.queen.cooldown <= 0) {
      c.workers.push({
        x: c.queen.x,
        y: c.queen.y,
        speed: 1.8,
        hp: 25,
        angle: 0,
        carrying: false
      });
      c.queen.cooldown = 120;
    }

    if (Math.random() < 0.002) {
      c.soldiers.push({
        x: c.queen.x,
        y: c.queen.y,
        speed: 1.6,
        hp: 60,
        angle: 0
      });
    }

    // workers
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

    for (let s of c.soldiers) {
      let dx = queen.x - s.x;
      let dy = queen.y - s.y;
      let d = Math.hypot(dx, dy);

      s.angle = Math.atan2(dy, dx);

      if (d < 10) {
        queen.hp -= 0.3;
      } else {
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
      }
    }

    c.workers = c.workers.filter(w => w.hp > 0);
    c.soldiers = c.soldiers.filter(s => s.hp > 0);
  }
}