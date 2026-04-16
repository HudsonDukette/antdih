let food = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function initFood() {
  food = [];
  for (let i = 0; i < 250; i++) {
    food.push({
      x: rand(0, WORLD_SIZE),
      y: rand(0, WORLD_SIZE)
    });
  }
}

function updateFood() {
  // NEVER let food die out OR randomly reset
  while (food.length < 250) {
    food.push({
      x: rand(0, WORLD_SIZE),
      y: rand(0, WORLD_SIZE)
    });
  }

  // soft respawn (prevents “despawn feeling”)
  if (Math.random() < 0.02 && food.length < 300) {
    food.push({
      x: rand(0, WORLD_SIZE),
      y: rand(0, WORLD_SIZE)
    });
  }
}