const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WORLD_SIZE = 5000;

let camera = { x: 0, y: 0 };

function worldToScreen(x, y) {
  return {
    x: x - camera.x,
    y: y - camera.y
  };
}

// REALISTIC DIRT (NO TILING SNAP)
function createDirt() {
  const c = document.createElement("canvas");
  c.width = 1200;
  c.height = 1200;
  const g = c.getContext("2d");

  g.fillStyle = "#3a2a1e";
  g.fillRect(0, 0, c.width, c.height);

  for (let i = 0; i < 20000; i++) {
    let x = Math.random() * c.width;
    let y = Math.random() * c.height;

    let v = 40 + Math.random() * 40;
    g.fillStyle = `rgb(${v+20}, ${v+10}, ${v})`;
    g.fillRect(x, y, 1.2, 1.2);
  }

  return c;
}

const dirt = createDirt();