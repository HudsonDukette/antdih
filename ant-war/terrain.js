let bushes = [];
let trees = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function initTerrain() {
  for (let i = 0; i < 60; i++) {
    bushes.push({ x: rand(0, WORLD_SIZE), y: rand(0, WORLD_SIZE), t: 0 });
  }

  for (let i = 0; i < 25; i++) {
    trees.push({ x: rand(0, WORLD_SIZE), y: rand(0, WORLD_SIZE), t: 0 });
  }
}

function updateTerrain() {
  for (let b of bushes) {
    b.t++;
    if (b.t > 180) {
      food.push({ x: b.x + rand(-10, 10), y: b.y + rand(-10, 10) });
      b.t = 0;
    }
  }

  for (let t of trees) {
    t.t++;
    if (t.t > 80) {
      food.push({ x: t.x + rand(-15, 15), y: t.y + rand(-15, 15) });
      t.t = 0;
    }
  }
}