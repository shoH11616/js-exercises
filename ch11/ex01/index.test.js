import { TypeMap } from "./index.js";

describe("TypeMap", () => {
  it("sets and gets values correctly", () => {
    class Foo {} // 空のクラス
    const typeMap = new TypeMap();
    // String コンストラクタをキーとして、String オブジェクトをマップに追加
    typeMap.set(String, new String("string"));
    // Number コンストラクタをキーとして、Number オブジェクトをマップに追加
    typeMap.set(Number, new Number(123));
    // Foo コンストラクタをキーとして、Foo オブジェクトをマップに追加
    typeMap.set(Foo, new Foo());

    // get メソッドを使って取得した値が、期待されるコンストラクタのインスタンスであることを検証
    expect(typeMap.get(String)).toBeInstanceOf(String);
    expect(typeMap.get(Number)).toBeInstanceOf(Number);
    expect(typeMap.get(Foo)).toBeInstanceOf(Foo);
  });

  it("throws error when setting invalid key or value", () => {
    class Foo {}
    const typeMap = new TypeMap();

    // set メソッドに無効なキーまたは値を渡したときにエラーが投げられることを検証
    expect(() => {
      typeMap.set(Date, "not a date");
    }).toThrow();

    expect(() => {
      typeMap.set(Foo, "not a Foo");
    }).toThrow();
  });
});
