function makeAnt(type, x, y) {
  return {
    x,
    y,
    type,
    speed: type === "soldier" ? 1.8 : 2.2,
    hp: type === "soldier" ? 60 : 25,
    angle: 0,
    carrying: false
  };
}

function spawnAnt(type) {
  ants.push(makeAnt(type, queen.x, queen.y));
}