// 数値型のプロパティを持つオブジェクト `obj1(例： {x: 1})` を作成しなさい。
// 続いて、作成済みの `obj1` に、プロパティを追加できることを確認しなさい`(例： y: 2 を obj1 に追加)`。

// 更に、`obj1` と同じプロパティ内容`{例: {x:1, y:2}}` のオブジェクト `obj2` を新規作成し、`obj1` と `obj2` を`===` で比較し結果を確認しなさい。

// 最後に、`obj1` と `obj2` を引数にとり、２つのオブジェクトが同じ内容なら、別オブジェクトでも `true` を返す関数 `equals` を作成しなさい。
// `equals` はテストコードも作成しなさい。

let obj1 = { x: 1 };
obj1.y = 2;
console.log(obj1); // => { x: 1, y: 2 }
let obj2 = { x: 1, y: 2 };
console.log(obj1 === obj2); // => false

export function equals(obj1, obj2) {
  if (obj1 === obj2) return true; // 同一のオブジェクトであれば等しい
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false; // プロパティ数の異なるオブジェクトは等しくない

  for (let key in obj1) {
    // 全てのプロパティを巡回する
    if (obj1[key] !== obj2[key]) return false; // 1つでも違っていれば正しくない
  }

  return true;
}
