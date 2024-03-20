export const obj = {
  // 半径
  r: 0,
  // 角度
  theta: 0,
  // xのゲッタ。極座標系を直行座標系に変換したものを返す。
  get x() {
    return this.r * Math.cos(this.theta);
  },
  // xのセッタ。新しいx座標を受け取り、rとthetaを再計算する。
  set x(value) {
    if (isNaN(value)) {
      throw new Error("Invalid value for x: " + value);
    }
    this.r = Math.sqrt(value * value + this.y * this.y);
    this.theta = Math.atan2(this.y, value);
  },
  // yのゲッタ。極座標系を直行座標系に変換したものを返す。
  get y() {
    return this.r * Math.sin(this.theta);
  },
  // yのセッタ。新しいx座標を受け取り、rとthetaを再計算する。
  set y(value) {
    if (isNaN(value)) {
      throw new Error("Invalid value for y: " + value);
    }
    this.r = Math.sqrt(this.x * this.x + value * value);
    this.theta = Math.atan2(value, this.x);
  },
};
