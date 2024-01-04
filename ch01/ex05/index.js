export function abs(number) {
  if (number >= 0) {
    return number;
  } else {
    return -number;
  }
}

 export function sum(array) {
  let sum = 0;
  for (let x of array) {
    sum += x;
  }
  return sum;
}

export function factorial(n) {
  let product = 1;
  while (n > 1) {
    product *= n;
    n--;
  }
  return product;
}
