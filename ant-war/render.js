function drawEntity(x, y, color, size) {
  let p = worldToScreen(x, y);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
  ctx.fill();
}

function drawAnt(a, color) {
  let p = worldToScreen(a.x, a.y);

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(a.angle);

  // segments
  ctx.fillStyle = color;
  ctx.fillRect(-6, -2, 4, 4);
  ctx.fillRect(-2, -3, 5, 5);
  ctx.fillRect(3, -2, 4, 4);

  ctx.restore();
}

function draw() {

  // dirt
  ctx.drawImage(dirt, 0, 0, canvas.width, canvas.height);

  // food
  for (let f of food) {
    drawEntity(f.x, f.y, "lime", 3);
  }

  // ants
  for (let a of ants) {
    drawAnt(a, a.type === "soldier" ? "orange" : "white");
  }

  // enemies
  for (let e of enemies) {
    drawAnt(e, "red");
  }

  // queen (SEGMENTED + HP BAR)
  drawAnt(queen, "cyan");

  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, queen.hp, 6);

  ctx.fillStyle = "white";
  ctx.fillText("Food: " + playerFood, 10, 40);
  ctx.fillText("Ants: " + ants.length, 10, 60);
}