console.log(Number.MAX_SAFE_INTEGER); // 最大値 => 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // 最小値 => -9007199254740991

console.log(Number.MAX_SAFE_INTEGER + 1); // 最大値+1 => 9007199254740992


console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // => true
// 理由: Number.MAX_SAFE_INTEGERよりも大きな整数を表現しようとすると整数の精度が保持されなくなるため、二つともNumber.MAX_SAFE_INTEGERとして評価されている