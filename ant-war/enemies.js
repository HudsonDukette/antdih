let enemyColonies = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// SAFE COLONY CREATION
function spawnColony(x, y) {
  enemyColonies.push({
    queen: {
      x,
      y,
      hp: 120,
      cooldown: 120
    },
    workers: [],
    soldiers: [], // ALWAYS EXISTS (critical fix)
    age: 0
  });
}

// INIT COLONIES
if (enemyColonies.length === 0) {
  for (let i = 0; i < 5; i++) {
    spawnColony(rand(0, WORLD_SIZE), rand(0, WORLD_SIZE));
  }
}

function updateEnemies() {

  for (let c of enemyColonies) {

    // HARD SAFETY CHECKS
    if (!c) continue;
    if (!c.queen) continue;
    if (!Array.isArray(c.workers)) c.workers = [];
    if (!Array.isArray(c.soldiers)) c.soldiers = [];

    c.age++;
    c.queen.cooldown--;

    // ===== SPAWN WORKERS =====
    if (c.queen.cooldown <= 0) {
      c.workers.push({
        x: c.queen.x,
        y: c.queen.y,
        type: "worker",
        speed: 1.8,
        hp: 25,
        angle: 0,
        carrying: false
      });

      c.queen.cooldown = 120;
    }

    // ===== SPAWN SOLDIERS (SAFE) =====
    if (Math.random() < 0.002) {
      c.soldiers.push({
        x: c.queen.x,
        y: c.queen.y,
        type: "soldier",
        speed: 1.6,
        hp: 60,
        angle: 0
      });
    }

    // ===== NEW COLONY SPAWN =====
    if (c.age > 2500 && Math.random() < 0.0006) {
      spawnColony(
        c.queen.x + rand(-250, 250),
        c.queen.y + rand(-250, 250)
      );
    }

    // ===== WORKERS =====
    for (let a of c.workers) {
      if (!a) continue;

      let target = findClosestFood(a.x, a.y);
      if (!target) continue;

      let dx = target.x - a.x;
      let dy = target.y - a.y;
      let d = Math.hypot(dx, dy);

      a.angle = Math.atan2(dy, dx);

      if (d < 6) {
        let i = food.indexOf(target);
        if (i !== -1) food.splice(i, 1);
        a.carrying = true;
      } else {
        a.x += Math.cos(a.angle) * a.speed;
        a.y += Math.sin(a.angle) * a.speed;
      }

      if (a.carrying) {
        let dx2 = c.queen.x - a.x;
        let dy2 = c.queen.y - a.y;
        let d2 = Math.hypot(dx2, dy2);

        a.angle = Math.atan2(dy2, dx2);

        if (d2 < 10) {
          a.carrying = false;
          playerFood++;
        } else {
          a.x += Math.cos(a.angle) * a.speed;
          a.y += Math.sin(a.angle) * a.speed;
        }
      }
    }

    // ===== SOLDIERS (SAFE ATTACK) =====
    for (let s of c.soldiers) {
      if (!s) continue;

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

    // CLEANUP
    c.workers = c.workers.filter(w => w && w.hp > 0);
    c.soldiers = c.soldiers.filter(s => s && s.hp > 0);
  }
}