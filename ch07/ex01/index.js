// 行列の加算
export function matrixAddition(a, b) {
    let result = [];
    for(let i = 0; i < a.length; i++) {
        result[i] = [];
        for(let j = 0; j < a[0].length; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
    return result;
}

// 行列の乗算
export function matrixMultiplication(a, b) {
    let result = [];
    for(let i = 0; i < a.length; i++) {
        result[i] = [];
        for(let j = 0; j < b[0].length; j++) {
            result[i][j] = 0;
            for(let k = 0; k < a[0].length; k++) {
                result[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return result;
}
