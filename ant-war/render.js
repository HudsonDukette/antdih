function drawAnt(a, color) {
  if (!a) return;

  let p = worldToScreen(a.x, a.y);

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(a.angle || 0);

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
      ctx.drawImage(dirt, x + i * dirt.width, y + j * dirt.height);
    }
  }
}

function drawUI() {

  if (gameState.mode === "menu") {
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.7;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("ANT WAR", canvas.width/2 - 100, canvas.height/2);

    ctx.font = "20px Arial";
    ctx.fillText("Click to Start", canvas.width/2 - 70, canvas.height/2 + 40);
    return;
  }

  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText("Food: " + playerFood, 10, 20);
  ctx.fillText("Ants: " + ants.length, 10, 40);
  ctx.fillText("Colonies: " + enemyColonies.length, 10, 60);
}

function draw() {
  drawWorld();

  for (let f of food) {
    let p = worldToScreen(f.x, f.y);
    ctx.fillStyle = "lime";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let a of ants) drawAnt(a, "white");

  for (let c of enemyColonies) {
    let q = c.queen;
    let p = worldToScreen(q.x, q.y);

    let pulse = 6 + Math.sin(Date.now()*0.005) * 2;

    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.fillText("Q", p.x, p.y - 10);
  }

  drawAnt(queen, "cyan");

  drawUI();
}