function drawAnt(a, color) {
  if (!a) return;

  let p = worldToScreen(a.x, a.y);
  if (!p) return;

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(a.angle || 0);

  ctx.fillStyle = color;
  ctx.fillRect(-6, -2, 4, 4);
  ctx.fillRect(-2, -3, 5, 5);
  ctx.fillRect(4, -2, 4, 4);

  ctx.restore();
}

// SAFE WORLD BACKGROUND (never breaks)
function drawWorld() {
  if (!dirt) return;

  let x = -camera.x % dirt.width;
  let y = -camera.y % dirt.height;

  for (let i = -1; i < 3; i++) {
    for (let j = -1; j < 3; j++) {
      ctx.drawImage(
        dirt,
        x + i * dirt.width,
        y + j * dirt.height
      );
    }
  }
}

function draw() {
  // ALWAYS FIRST (prevents white screen look)
  drawWorld();

  // SAFE FOOD
  if (Array.isArray(food)) {
    for (let f of food) {
      if (!f) continue;
      let p = worldToScreen(f.x, f.y);
      ctx.fillStyle = "lime";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // SAFE ANTS
  if (Array.isArray(ants)) {
    for (let a of ants) drawAnt(a, "white");
  }

  // SAFE ENEMY COLONIES
  if (Array.isArray(enemyColonies)) {
    for (let c of enemyColonies) {
      if (!c || !c.queen) continue;

      let q = c.queen;
      let p = worldToScreen(q.x, q.y);

      ctx.fillStyle = "purple";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // PLAYER QUEEN (always last)
  drawAnt(queen, "cyan");
}