// myModule.js

/**
 * 指定された名前に対して挨拶メッセージを返す関数。
 *
 * @param {string} name - 挨拶する対象の名前。
 * @return {string} 挨拶メッセージ。
 */
export function greet(name) {
  return `Hello, ${name}!`;
}

/**
 * Personクラス。
 */
export default class Person {
  /**
   * Personクラスのコンストラクタ。
   *
   * @param {string} name - 人物の名前。
   * @param {number} age - 人物の年齢。
   */
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  /**
   * 自己紹介メッセージを返すメソッド。
   *
   * @return {string} 自己紹介メッセージ。
   */
  introduce() {
    return `My name is ${this.name} and I am ${this.age} years old.`;
  }
}
