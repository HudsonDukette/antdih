let keys = {};

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

window.addEventListener("click", () => {

  if (gameState.mode === "menu") {
    gameState.mode = "playing";
    return;
  }

  // BURROW MODE (first click builds colony)
  if (!colony.burrowed) {
    burrow(queen.x, queen.y);
    return;
  }

  // spawn worker egg (2-food cost system)
  if (playerFood >= 2) {
    playerFood -= 2;
    spawnEgg("worker");
  }
});

window.addEventListener("contextmenu", e => {
  e.preventDefault();

  // soldiers cost more
  if (playerFood >= 10) {
    playerFood -= 10;
    spawnEgg("soldier");
  }
});