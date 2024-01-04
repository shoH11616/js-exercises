let obj = { a: 1, b: 2, c: 3 };
console.log("propNames:");
for (let propName in obj) {
  console.log(propName);
}

console.log("values:");
for (let propName in obj) {
  console.log(obj[propName]);
}
