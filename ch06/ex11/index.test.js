import { obj } from "./index.js";

describe("obj", () => {
    it("should correctly get and set x and y", () => {
      obj.r = 5;
      obj.theta = Math.PI / 4; // 45 degrees
  
      // Check getters
      expect(obj.x).toBeCloseTo(5 * Math.cos(Math.PI / 4));
      expect(obj.y).toBeCloseTo(5 * Math.sin(Math.PI / 4));
  
      // Check setters
      obj.x = 3;
      obj.y = 4;
      expect(obj.r).toBeCloseTo(5); // hypotenuse of a 3-4-5 right triangle
      expect(obj.theta).toBeCloseTo(Math.atan2(4, 3));
    });
  
    it("should throw an error when setting x or y to NaN", () => {
      expect(() => { obj.x = NaN; }).toThrowError("Invalid value for x: NaN");
      expect(() => { obj.y = NaN; }).toThrowError("Invalid value for y: NaN");
    });
  });