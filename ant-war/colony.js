let colony = {
  entrance: { x: WORLD_SIZE / 2, y: WORLD_SIZE / 2 },
  burrowed: false,
  level: 0, // 0 = surface, 1 = underground
  eggs: [],
  defenders: []
};

function burrow(x, y) {
  colony.entrance.x = x;
  colony.entrance.y = y;
  colony.burrowed = true;
  colony.level = 1;
}

// egg system: 2-stage growth
function spawnEgg(type) {
  colony.eggs.push({
    x: colony.entrance.x,
    y: colony.entrance.y,
    type,
    progress: 0,
    stage: "egg"
  });
}

function updateColony() {

  for (let e of colony.eggs) {
    e.progress += 0.01;

    // stage 1 → needs worker food
    if (e.progress > 1 && e.stage === "egg") {
      e.stage = "growing";
    }

    // hatch
    if (e.progress > 2) {
      if (e.type === "worker") {
        ants.push(makeAnt("worker", colony.entrance.x, colony.entrance.y));
      }

      if (e.type === "soldier") {
        ants.push(makeAnt("soldier", colony.entrance.x, colony.entrance.y));
      }

      if (e.type === "defender") {
        colony.defenders.push(makeDefender());
      }

      colony.eggs.splice(colony.eggs.indexOf(e), 1);
    }
  }

  // defenders guard underground
  for (let d of colony.defenders) {
    let target = findNearestEnemy(d.x, d.y, "player");

    if (target) {
      let dx = target.x - d.x;
      let dy = target.y - d.y;
      let dist = Math.hypot(dx, dy);

      d.angle = Math.atan2(dy, dx);

      if (dist < 8) {
        target.ref.hp -= 1.5;
      } else {
        d.x += Math.cos(d.angle) * d.speed;
        d.y += Math.sin(d.angle) * d.speed;
      }
    }
  }

  colony.defenders = colony.defenders.filter(d => d.hp > 0);
}

function makeDefender() {
  return {
    x: colony.entrance.x,
    y: colony.entrance.y,
    hp: 140,
    speed: 0.6,
    angle: 0
  };
}