class Player {
  id;
  constructor({ x, y }, name, id) {
    this.x = x;
    this.y = y;
    this.points = 0;
    this.direction = [-1, 0];
    this.name = name;
    this.id = id;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
}

module.exports = Player;
