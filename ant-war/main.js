initFood();

for (let i = 0; i < 15; i++) spawnEnemy();

function update() {

  // queen movement
  if (keys["w"]) queen.y -= queen.speed;
  if (keys["s"]) queen.y += queen.speed;
  if (keys["a"]) queen.x -= queen.speed;
  if (keys["d"]) queen.x += queen.speed;

  camera.x = queen.x - canvas.width / 2;
  camera.y = queen.y - canvas.height / 2;

  updateAnts();
  updateEnemies();
  updateFood();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();