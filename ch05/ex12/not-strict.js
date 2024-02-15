// テスト用のオブジェクトを作成
let obj = {prop1: 'value1', prop2: 'value2', prop3: 'value3'};

// 直接的なプロパティアクセスの時間を計測
let start1 = performance.now();
for (let i = 0; i < 1000000; i++) {
    let x1 = obj.prop1;
    let x2 = obj.prop2;
    let x3 = obj.prop3;
}
let end1 = performance.now();
console.log('Direct property access time: ' + (end1 - start1) + ' ms');

// `with`ステートメントを使用したプロパティアクセスの時間を計測します
let start2 = performance.now();
for (let i = 0; i < 1000000; i++) {
    with (obj) {
        let y1 = prop1;
        let y2 = prop2;
        let y3 = prop3;
    }
}
let end2 = performance.now();
console.log('Property access time with `with`: ' + (end2 - start2) + ' ms');
