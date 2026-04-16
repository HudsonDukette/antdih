function getAllUnits() {
  let units = [];

  // player ants
  for (let a of ants) {
    units.push({ x: a.x, y: a.y, hp: a.hp, team: "player", ref: a });
  }

  // enemy colonies
  for (let c of enemyColonies) {

    for (let w of c.workers) {
      units.push({ x: w.x, y: w.y, hp: w.hp, team: "enemy", ref: w });
    }

    for (let s of c.soldiers) {
      units.push({ x: s.x, y: s.y, hp: s.hp, team: "enemy", ref: s });
    }

    units.push({
      x: c.queen.x,
      y: c.queen.y,
      hp: c.queen.hp,
      team: "enemy",
      ref: c.queen,
      isQueen: true
    });
  }

  // player queen
  units.push({
    x: queen.x,
    y: queen.y,
    hp: queen.hp,
    team: "player",
    ref: queen,
    isQueen: true
  });

  return units;
}

function findNearestEnemy(x, y, team) {
  let units = getAllUnits();

  let best = null;
  let bestD = Infinity;

  for (let u of units) {
    if (u.team === team) continue;

    let d = Math.hypot(u.x - x, u.y - y);

    if (d < bestD) {
      bestD = d;
      best = u;
    }
  }

  return best;
}