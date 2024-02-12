// テスト用のオブジェクトを作成
var obj = {prop1: 'value1', prop2: 'value2', prop3: 'value3'};

// 直接的なプロパティアクセスの時間を計測
var start1 = performance.now();
for (var i = 0; i < 1000000; i++) {
    var x1 = obj.prop1;
    var x2 = obj.prop2;
    var x3 = obj.prop3;
}
var end1 = performance.now();
console.log('Direct property access time: ' + (end1 - start1) + ' ms');

// `with`ステートメントを使用したプロパティアクセスの時間を計測します
var start2 = performance.now();
for (var i = 0; i < 1000000; i++) {
    with (obj) {
        var y1 = prop1;
        var y2 = prop2;
        var y3 = prop3;
    }
}
var end2 = performance.now();
console.log('Property access time with `with`: ' + (end2 - start2) + ' ms');
