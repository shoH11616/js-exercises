const mock = jest.fn();
// ここでエラー:ReferenceError: jest is not definedが発生

const obj = {
  x: 0,
  y: 0,
  sum() {
    mock();
    return this.x + this.y;
  },
};

Object.defineProperty(obj, "sum", { enumerable: false });

obj.x = 1;
obj.y = 2;
expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2}`);
expect(mock).toHaveBeenCalled();
