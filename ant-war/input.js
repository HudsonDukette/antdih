let keys = {};

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

window.addEventListener("click", () => {
  if (playerFood > 0) {
    spawnAnt("worker");
    playerFood--;
  }
});

window.addEventListener("contextmenu", e => {
  e.preventDefault();
  if (playerFood >= 3) {
    spawnAnt("soldier");
    playerFood -= 3;
  }
});