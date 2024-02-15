1
配列の初期化子が関数の読み出しやほかの動的な表現を持つ場合、値が異なる可能性があるということ。
例えば
let array = [Math.random(), Math.random(), Math.random()];
としたらMath.random()は初期化子ごとに評価され、当然値も異なるものが返される。

2
コードの差分を記録するもの（gitやdiff）において、配列の要素を追加するした後の差分の表示のされ方がことなってくる
終端カンマがないと、,~と追加されるため、その前の要素にも変化の印がついてしまう

3
参考書ではnewがどのように使われるか、つまり式の前に置かれるキーワードとして扱っているのに対し、MDNはnewが何をするか、つまり新しいオブジェクトを生成する演算子として、それぞれ異なる観点で紹介されている、という違いがある。

4,
引数があるかないかの違い？基本的に引数がない場合はどちらも空のオブジェクトを参照する気がする

5,
三項演算子を連続させた場合に結果が異なるif ,,, els if,,,,みたいな感じ

var value = condition1 ? value1 : condition2 ? value2 : value3;
右結合
var value = condition1 ? value1 : (condition2 ? value2 : value3);
左結合
var value = (condition1 ? value1 : condition2) ? value2 : value3;

6,
JavaScriptのeval関数が現在のスコープチェーンを使用する
しかし、ESM（ECMAScript Modules）では、モジュールスコープが導入され、eval関数はモジュールスコープを参照できない。
eval関数内で定義されたローカル変数yにアクセスしようとすると、y is not definedというエラーが発生します。????
gevalがローカル参照できないから？？？

7,
配列の特定のインデックスに値が存在しない「空のスロット」を明示できる。実際配列の長さは変わらない
let sparseArray = [1, , , , 5];
console.log(sparseArray); // 出力: [1, <3 empty items>, 5]

8,
void ... 演算子。オペランドの評価結果を「無視」して常にundefinedを返す
undefined ... 特殊な値、変数が値を持たないことを示す。
