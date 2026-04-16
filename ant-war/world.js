const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WORLD_SIZE = 4000;

let camera = { x: 0, y: 0 };

function worldToScreen(x, y) {
  return {
    x: x - camera.x,
    y: y - camera.y
  };
}