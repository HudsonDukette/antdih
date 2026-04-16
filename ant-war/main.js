function safeInit() {
  if (typeof initTerrain === "function") initTerrain();
  if (typeof initFood === "function") initFood();
  if (typeof spawnEnemyColonies === "function") spawnEnemyColonies;
}

// fallback safe arrays
if (!Array.isArray(food)) food = [];
if (!Array.isArray(ants)) ants = [];
if (!Array.isArray(enemyColonies)) enemyColonies = [];

safeInit();

function update() {

  if (keys["w"]) queen.y -= queen.speed;
  if (keys["s"]) queen.y += queen.speed;
  if (keys["a"]) queen.x -= queen.speed;
  if (keys["d"]) queen.x += queen.speed;

  camera.x = queen.x - canvas.width / 2;
  camera.y = queen.y - canvas.height / 2;

  if (typeof updateTerrain === "function") updateTerrain();
  if (typeof updateFood === "function") updateFood();
  if (typeof updateAnts === "function") updateAnts();
  if (typeof updateEnemies === "function") updateEnemies();

  queen.x = Math.max(0, Math.min(WORLD_SIZE, queen.x));
  queen.y = Math.max(0, Math.min(WORLD_SIZE, queen.y));
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();