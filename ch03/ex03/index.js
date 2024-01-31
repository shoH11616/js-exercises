export function judgeEqual(num1, num2) {
    // 符号に左右されないように、絶対値を取得する
    return Math.abs(num1 - num2) < 1e-10;
}

// export function judgeEqual(num1, num2) {
//     return num1 - num2 < 1e-10;
// }