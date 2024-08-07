import { createLoggingProxy } from "./index.js";

describe("createLoggingProxy", () => {
  it("records method calls correctly", () => {
    const target = {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
    };
    // 'createLoggingProxy'関数を呼び出し、プロキシと履歴の配列を取得
    const [proxy, history] = createLoggingProxy(target);

    // プロキシ経由でメソッドを呼び出す
    proxy.add(1, 2);
    proxy.subtract(5, 3);

    // メソッド呼び出しの履歴が正しく記録されていることを確認
    expect(history.length).toBe(2);

    // 最初のメソッド呼び出し（'add'）が正しく記録されていることを確認
    expect(history[0].method).toBe("add");
    expect(history[0].args).toEqual([1, 2]);

    // 2つ目のメソッド呼び出し（'subtract'）が正しく記録されていることを確認
    expect(history[1].method).toBe("subtract");
    expect(history[1].args).toEqual([5, 3]);
  });
});
