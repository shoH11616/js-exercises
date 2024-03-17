export const obj = {
    r: 0,
    theta: 0,
    get x() {
      return this.r * Math.cos(this.theta);
    },
    set x(value) {
      if (isNaN(value)) {
        throw new Error("Invalid value for x: " + value);
      }
      this.r = Math.sqrt(value * value + this.y * this.y);
      this.theta = Math.atan2(this.y, value);
    },
    get y() {
      return this.r * Math.sin(this.theta);
    },
    set y(value) {
      if (isNaN(value)) {
        throw new Error("Invalid value for y: " + value);
      }
      this.r = Math.sqrt(this.x * this.x + value * value);
      this.theta = Math.atan2(value, this.x);
    },
  };