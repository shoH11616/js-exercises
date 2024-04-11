// プロトタイプオブジェクトを作成
let prototypeObject = {
  prototypeNumber: 1,
  prototypeString: "prototype",
};

// プロトタイプと同名のプロパティを持つオブジェクトを作成
let myObject = Object.create(prototypeObject);
myObject.prototypeNumber = 2;
myObject.prototypeString = "object";
myObject.objectNumber = 3;
myObject.objectString = "object";

// プロトタイプの列挙可能なプロパティと同名の列挙不可能なプロパティをオブジェクトに追加
Object.defineProperty(prototypeObject, "prototypeNumber", {
  enumerable: false,
});

// for/inループを使用してオブジェクトのプロパティを列挙
for (let property in myObject) {
  console.log(property + ": " + myObject[property]);
}
// => objectNumber: 3
// => objectString: object
// 順番の理由
// ：列挙可能な状態（enumerable: true）に設定されているobjectNumberとobjectStringのみが出力される
