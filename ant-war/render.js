function drawAnt(a, color) {
  let p = worldToScreen(a.x, a.y);

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(a.angle);

  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-3, i * 5);
    ctx.stroke();
  }

  ctx.fillStyle = color;
  ctx.fillRect(-3, -3, 6, 6);

  ctx.restore();
}

function draw() {
  ctx.fillStyle = "#2f241c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // food
  ctx.fillStyle = "lime";
  for (let f of food) {
    let p = worldToScreen(f.x, f.y);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // ants
  for (let a of ants) {
    drawAnt(a, a.type === "soldier" ? "orange" : "white");
  }

  // enemies
  ctx.fillStyle = "red";
  for (let e of enemies) {
    let p = worldToScreen(e.x, e.y);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // queen
  let q = worldToScreen(queen.x, queen.y);
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(q.x, q.y, 8, 0, Math.PI * 2);
  ctx.fill();

  // UI
  ctx.fillStyle = "white";
  ctx.fillText("Food: " + playerFood, 10, 20);
  ctx.fillText("Ants: " + ants.length, 10, 40);
  ctx.fillText("Enemies: " + enemies.length, 10, 60);
}