var arr = ["r", "i", "c", "o", "h"];
delete arr[3];
console.log(arr); //=> ["r", "i", "c", undefined, "h"]
console.log(arr.length); //=> 5