console.log("=== イテレータのテスト ===");
import { counterIter, counterGen } from "./iterator.js";
let iter = counterIter(3);
console.log(iter.next()); // 明示的に next() メソッドを呼び出す
console.log(iter.next()); // 明示的に next() メソッドを呼び出す
console.log(iter.return("終了")); // 明示的に return() メソッドを呼び出す
try {
  iter.throw(new Error("エラー")); // 明示的に throw() メソッドを呼び出す
} catch (e) {
  console.log(e.message); // "エラー"
}

console.log("=== ジェネレータのテスト ===");
let gen = counterGen(3);
console.log(gen.next()); // 明示的に next() メソッドを呼び出す
console.log(gen.next()); // 明示的に next() メソッドを呼び出す
console.log(gen.return("終了")); // 明示的に return() メソッドを呼び出す

gen = counterGen(3);
try {
  gen.throw(new Error("エラー")); // 明示的に throw() メソッドを呼び出す
} catch (e) {
  console.log(e.message); // "エラー"
}
