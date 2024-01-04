class Example {
  constructor() {
    this.value = 10;
    this.message = "Hello, World!!";
  }
  valueOf() {
    return this.value;
  }

  toString() {
    return this.message;
  }
}

let obj = new Example();

console.log(obj + 0); // => 10
console.log(`${obj}`); // => "Hello, World!!"
