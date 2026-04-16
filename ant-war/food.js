let food = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function initFood() {
  for (let i = 0; i < 250; i++) {
    food.push({
      x: rand(0, WORLD_SIZE),
      y: rand(0, WORLD_SIZE)
    });
  }
}

function updateFood() {
  while (food.length < 250) {
    food.push({
      x: rand(0, WORLD_SIZE),
      y: rand(0, WORLD_SIZE)
    });
  }
}