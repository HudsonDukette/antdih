const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WORLD_SIZE = 5000;

let camera = { x: 0, y: 0 };

function worldToScreen(x, y) {
  return { x: x - camera.x, y: y - camera.y };
}

// dirt background
const dirtCanvas = document.createElement("canvas");
dirtCanvas.width = 1200;
dirtCanvas.height = 1200;
const dctx = dirtCanvas.getContext("2d");

dctx.fillStyle = "#3a2a1e";
dctx.fillRect(0, 0, 1200, 1200);

for (let i = 0; i < 20000; i++) {
  let x = Math.random() * 1200;
  let y = Math.random() * 1200;
  let v = 40 + Math.random() * 40;
  dctx.fillStyle = `rgb(${v+20},${v+10},${v})`;
  dctx.fillRect(x, y, 1.2, 1.2);
}

const dirt = dirtCanvas;