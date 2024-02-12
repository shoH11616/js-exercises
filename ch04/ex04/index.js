export function bitCount(n) {
    let count = 0;
    while (n) {
        // nの最下位ビットが1であるかチェック
        // 1でえあればn&1は1を返しcountに加算、最下位ビットが0であれば0を返しcountは変化しない
        count += n & 1;
        // nを→に1ビットシフト
        n >>= 1;
    }
    // 1ビットの数を返す
    return count;
}
