// `Symbol()` を使い、同じ文字列から生成された 2 個の `Symbol` 変数を作成し、それらをプロパティとして持つオブジェクトを作成しなさい。
// そのオブジェクトに対して、作成した`Symbol`変数を使って各プロパティの値を取得しなさい。
// また、`Symbol()`ではなく、`Symbol.for()`で同名の変数を作成した場合の挙動を確認しなさい。

let symbol1 = Symbol("shared");
let symbol2 = Symbol("shared");
let obj = {};
obj[symbol1] = 1;
obj[symbol2] = 2;

console.log(obj[symbol1]); // => 1
console.log(obj[symbol2]); // => 2

let symbol3 = Symbol.for("shared");
let symbol4 = Symbol.for("shared");
let obj2 = {};
obj2[symbol3] = 3;
obj2[symbol4] = 4;

console.log(obj2[symbol3]); // => 4
console.log(obj2[symbol4]); // => 4

//SymbolForでは、すでに同じ文字列で関連づけられたSymbol値があるため、同じものが返される