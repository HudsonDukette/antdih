let enemies = [];

function spawnEnemy() {
  enemies.push({
    x: rand(0, WORLD_SIZE),
    y: rand(0, WORLD_SIZE),
    hp: 60,
    speed: 1.2,
    angle: 0,
    segments: 3
  });
}

function updateEnemies() {

  for (let e of enemies) {

    let target = getClosest(ants, e.x, e.y);
    if (!target) target = queen;

    let dx = target.x - e.x;
    let dy = target.y - e.y;
    let d = Math.hypot(dx, dy);

    e.angle = Math.atan2(dy, dx);

    if (d > 0) {
      e.x += Math.cos(e.angle) * e.speed;
      e.y += Math.sin(e.angle) * e.speed;
    }

    if (d < 10) {
      if (target === queen) queen.hp -= 0.2;
      else target.hp -= 0.4;
    }
  }

  enemies = enemies.filter(e => e.hp > 0);
}