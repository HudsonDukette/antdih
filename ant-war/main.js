function loop() {
  updateTerrain();
  updateAnts();
  updateEnemies();
  updateInput?.();

  camera.x = queen.x - canvas.width / 2;
  camera.y = queen.y - canvas.height / 2;

  draw();

  requestAnimationFrame(loop);
}

loop();