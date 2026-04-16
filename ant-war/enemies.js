let enemies = [];

function spawnEnemy() {
  enemies.push({
    x: rand(0, WORLD_SIZE),
    y: rand(0, WORLD_SIZE),
    speed: 1.2,
    hp: 40
  });
}

function getClosestTarget(e) {
  let best = queen;
  let bestD = Math.hypot(e.x - queen.x, e.y - queen.y);

  for (let a of ants) {
    let d = Math.hypot(e.x - a.x, e.y - a.y);
    if (d < bestD) {
      bestD = d;
      best = a;
    }
  }

  return best;
}

function updateEnemies() {
  for (let e of enemies) {

    let t = getClosestTarget(e);

    let dx = t.x - e.x;
    let dy = t.y - e.y;
    let d = Math.hypot(dx, dy);

    if (d > 0) {
      e.x += dx / d * e.speed;
      e.y += dy / d * e.speed;
    }

    if (d < 10) {
      if (t === queen) queen.hp -= 0.15;
      else t.hp -= 0.3;
    }
  }

  enemies = enemies.filter(e => e.hp > 0);
}