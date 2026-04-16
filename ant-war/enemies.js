let enemyColonies = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// create a colony
function spawnColony(x, y) {
  enemyColonies.push({
    queen: {
      x,
      y,
      hp: 120,
      cooldown: 120
    },
    workers: [],
    soldiers: [],
    age: 0
  });
}

// initial colonies
for (let i = 0; i < 5; i++) {
  spawnColony(rand(0, WORLD_SIZE), rand(0, WORLD_SIZE));
}

function updateEnemies() {

  for (let c of enemyColonies) {
    c.age++;
    c.queen.cooldown--;

    // spawn worker
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

    // spawn soldier randomly
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

    // spawn new colony (new queen)
    if (c.age > 3000 && Math.random() < 0.0008) {
      spawnColony(
        c.queen.x + rand(-250, 250),
        c.queen.y + rand(-250, 250)
      );
    }

    // ===== WORKERS =====
    for (let a of c.workers) {

      let target = findClosestFood(a.x, a.y);

      if (target) {
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
      }

      if (a.carrying) {
        let dx = c.queen.x - a.x;
        let dy = c.queen.y - a.y;
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

    // ===== SOLDIERS =====
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

    // cleanup
    c.workers = c.workers.filter(w => w.hp > 0);
    c.soldiers = c.soldiers.filter(s => s.hp > 0);
  }
}