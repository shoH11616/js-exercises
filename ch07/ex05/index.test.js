import { pop, push, shift, unshift, sort } from "./index.js";

describe("Array methods", () => {
  const seq = [1, 2, 3, 4, 5];

  it("removes the last element from an array", () => {
    expect(pop(seq)).toEqual([1, 2, 3, 4]);
  });

  it("adds a new element to the end of an array", () => {
    expect(push(seq, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("removes the first element from an array", () => {
    expect(shift(seq)).toEqual([2, 3, 4, 5]);
  });

  it("adds a new element to the beginning of an array", () => {
    expect(unshift(seq, 0)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("sorts the elements of an array in descending order", () => {
    expect(sort(seq, (a, b) => b - a)).toEqual([5, 4, 3, 2, 1]);
  });

  it("does not mutate the original array", () => {
    expect(seq).toEqual([1, 2, 3, 4, 5]);
  });
});
