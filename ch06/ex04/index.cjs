/* eslint-disable no-prototype-builtins */
let obj = {};

// プロパティを定義
Object.defineProperty(obj, 'prop', {
  value: 42, // 値：42
  writable: false,  // 書き込み不可
  enumerable: true, // 列挙可能
  configurable: false // 削除、変更不可
});

console.log(obj.prop); // => 42

// プロパティの変更を試みる
obj.prop = 77;
console.log(obj.prop); // => 42 
// configurable: falseで変更不可に設定したため値は変わらない

// プロパティの削除を試みる
delete obj.prop;
console.log(obj.prop); // => 42 
// configurable: falseで削除不可に設定したため値は変わらない

// hasOwnPropertyとpropertyIsEnumerableの結果を確認
console.log(obj.hasOwnProperty('prop')); // => true
// objはpropというプロパティを自身のプロパティとして有する
console.log(obj.propertyIsEnumerable('prop')); // => true
// propというプロパティは列挙可能であり、for inループなどで列挙されうる