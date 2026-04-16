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

  // SURFACE ANTS
  for (let a of ants) {
    drawAnt(a, "white");
  }

  // ENEMIES
  for (let c of enemyColonies) {
    let q = c.queen;
    let p = worldToScreen(q.x, q.y);

    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // COLONY SYSTEM (BURROW)
  if (colony.burrowed) {

    let p = worldToScreen(colony.entrance.x, colony.entrance.y);

    // tunnel entrance
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // defenders
    for (let d of colony.defenders) {
      let dp = worldToScreen(d.x, d.y);
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(dp.x, dp.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // eggs
    for (let e of colony.eggs) {
      let ep = worldToScreen(e.x, e.y);
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(ep.x, ep.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawAnt(queen, "cyan");

  drawUI();
}