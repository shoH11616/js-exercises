import { createLoggingProxy } from "./index.js";

describe("createLoggingProxy", () => {
  it("records method calls correctly", () => {
    const target = {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
    };

    const [proxy, history] = createLoggingProxy(target);

    // メソッドを呼び出す
    proxy.add(1, 2);
    proxy.subtract(5, 3);

    // メソッド呼び出しの履歴を確認する
    expect(history.length).toBe(2);

    // 最初のメソッド呼び出しを確認する
    expect(history[0].method).toBe("add");
    expect(history[0].args).toEqual([1, 2]);

    // 2つ目のメソッド呼び出しを確認する
    expect(history[1].method).toBe("subtract");
    expect(history[1].args).toEqual([5, 3]);
  });
});
