let enemies = [];

function spawnEnemy() {
  enemies.push({
    x: rand(0, WORLD_SIZE),
    y: rand(0, WORLD_SIZE),
    hp: 60,
    speed: 1.2,
    angle: 0
  });
}

function updateEnemies() {
  for (let e of enemies) {

    let target = queen;

    for (let a of ants) {
      let d = Math.hypot(a.x - e.x, a.y - e.y);
      let q = Math.hypot(queen.x - e.x, queen.y - e.y);
      if (d < q) target = a;
    }

    let dx = target.x - e.x;
    let dy = target.y - e.y;
    let d = Math.hypot(dx, dy);

    e.angle = Math.atan2(dy, dx);

    if (d > 0) {
      e.x += Math.cos(e.angle) * e.speed;
      e.y += Math.sin(e.angle) * e.speed;
    }

    if (d < 10) {
      target.hp -= 0.3;
    }
  }

  enemies = enemies.filter(e => e.hp > 0);
}