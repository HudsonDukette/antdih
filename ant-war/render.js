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

function drawWorld() {
  let x = -camera.x % dirt.width;
  let y = -camera.y % dirt.height;

  for (let i = -1; i < 3; i++) {
    for (let j = -1; j < 3; j++) {
      ctx.drawImage(
        dirt,
        x + i * dirt.width,
        y + j * dirt.height,
        dirt.width,
        dirt.height
      );
    }
  }
}

function draw() {
  drawWorld();

  // FOOD
  for (let f of food) {
    let p = worldToScreen(f.x, f.y);
    ctx.fillStyle = "lime";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // PLAYER ANTS
  for (let a of ants) {
    drawAnt(a, a.type === "soldier" ? "orange" : "white");
  }

  // ENEMY COLONIES
  for (let c of enemyColonies) {

    let q = c.queen;
    let p = worldToScreen(q.x, q.y);

    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.fillText(
      c.workers.length + "/" + c.soldiers.length,
      p.x + 10,
      p.y
    );
  }

  // PLAYER QUEEN
  drawAnt(queen, "cyan");

  ctx.fillStyle = "white";
  ctx.fillText("Food: " + playerFood, 10, 20);
  ctx.fillText("Ants: " + ants.length, 10, 40);
}