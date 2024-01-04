test("Get point from points array", () => {
    let points = [{x:1, y:2}, {x:3, y:4}];
    let[{x: x1, y: y1}, {x: x2, y: y2}] = points;
    expect(x1).toBe(1); // => pass
    expect(y1).toBe(2); // => pass
    expect(x2).toBe(3); // => pass
    expect(y2).toBe(4); // => pass
});