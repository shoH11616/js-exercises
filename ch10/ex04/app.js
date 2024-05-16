// app.js

// myModule.jsから関数とクラスをインポート
// 名前変更を伴うインポート。greet関数をhelloGreetとしてインポート。
import { greet as helloGreet } from "./myModule.js";
// デフォルトのインポート。Personクラスをデフォルトインポート。
import Person from "./myModule.js";

// 関数の利用
console.log(helloGreet("Alice"));

// クラスの利用
const bob = new Person("Bob", 25);
console.log(bob.introduce());
