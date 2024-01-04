export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(point) {
    this.x += point.x;
    this.y += point.y;
  }
}
