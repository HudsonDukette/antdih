initTerrain();

for (let i = 0; i < 12; i++) spawnEnemy();

function update() {

  if (keys["w"]) queen.y -= queen.speed;
  if (keys["s"]) queen.y += queen.speed;
  if (keys["a"]) queen.x -= queen.speed;
  if (keys["d"]) queen.x += queen.speed;

  camera.x = queen.x - canvas.width / 2;
  camera.y = queen.y - canvas.height / 2;

  updateTerrain();
  updateAnts();
  updateEnemies();

  // camera bounds
  queen.x = Math.max(0, Math.min(WORLD_SIZE, queen.x));
  queen.y = Math.max(0, Math.min(WORLD_SIZE, queen.y));
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();