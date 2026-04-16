function drawAnt(a, color) {
  let p = worldToScreen(a.x, a.y);

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(a.angle);

  ctx.fillStyle = color;
  ctx.fillRect(-6, -2, 4, 4);
  ctx.fillRect(-2, -3, 5, 5);
  ctx.fillRect(4, -2, 4, 4);

  ctx.restore();
}

function draw() {
  ctx.drawImage(dirt, 0, 0, canvas.width, canvas.height);

  for (let f of food) {
    let p = worldToScreen(f.x, f.y);
    ctx.fillStyle = "lime";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let a of ants) drawAnt(a, a.type === "soldier" ? "orange" : "white");
  for (let e of enemies) drawAnt(e, "red");

  drawAnt(queen, "cyan");

  ctx.fillStyle = "white";
  ctx.fillText("Food: " + playerFood, 10, 20);
  ctx.fillText("Ants: " + ants.length, 10, 40);
}