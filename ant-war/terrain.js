let food = [];
let bushes = [];
let trees = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function initTerrain() {

  for (let i = 0; i < 200; i++) {
    food.push({ x: rand(0, WORLD_SIZE), y: rand(0, WORLD_SIZE), type: "food" });
  }

  for (let i = 0; i < 60; i++) {
    bushes.push({ x: rand(0, WORLD_SIZE), y: rand(0, WORLD_SIZE), regen: 0 });
  }

  for (let i = 0; i < 25; i++) {
    trees.push({ x: rand(0, WORLD_SIZE), y: rand(0, WORLD_SIZE), regen: 0 });
  }
}

function updateTerrain() {

  // food respawn
  while (food.length < 200) {
    food.push({ x: rand(0, WORLD_SIZE), y: rand(0, WORLD_SIZE) });
  }

  // bushes (fast regen)
  for (let b of bushes) {
    b.regen++;
    if (b.regen > 200) {
      food.push({ x: b.x + rand(-10,10), y: b.y + rand(-10,10) });
      b.regen = 0;
    }
  }

  // trees (VERY fast regen)
  for (let t of trees) {
    t.regen++;
    if (t.regen > 80) {
      food.push({ x: t.x + rand(-20,20), y: t.y + rand(-20,20) });
      t.regen = 0;
    }
  }
}