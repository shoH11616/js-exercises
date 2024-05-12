// app.js

// myModule.jsから関数とクラスをインポート
import { greet, Person } from "./myModule.js";

// 関数の利用
console.log(greet("Alice"));

// クラスの利用
const bob = new Person("Bob", 25);
console.log(bob.introduce());
