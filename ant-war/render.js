for (let c of enemyColonies) {
  if (!c || !c.queen) continue;

  let q = c.queen;
  let p = worldToScreen(q.x, q.y);

  ctx.fillStyle = "purple";
  ctx.beginPath();
  ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
  ctx.fill();
}