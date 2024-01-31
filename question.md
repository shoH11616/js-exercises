1, 自分のグループではコメントは基本日本語？→　はい
2, Symbol関数は同じ値を返さない、とありますが、具体的に関数単位、モジュール単位など、どの範囲までユニークな値を返す保証があるのでしょうか
 - 関数単位,モジュール単位, あるいはアプリケーション全体のどの範囲でもSymbol関数は一意の値を保証する（ChatGPT）
 - Symbolはそもそもセキュリティ面ではなく、JavaScriptオブジェクトを安全に拡張するために用意されたもの（https://analogic.jp/symbol/）

3,nodeでstrictモードをオフにする方法 - わからなかった。configをいじるとか？
4, ES6でfor/ofループと反復可能オブジェクトを導入するときにSymbolを使わなければいけなかったとありますが、それはなぜですか？
 - for/ofを追加する際にiteraterという名前でメソッドを定義した→世の中の既存のユーザーが作ったJavaScriptコードに存在する、iteraterメソッドを壊す可能性がある（iteraterというメソッド名が公式のものになるから）。なのでSymbolを使ってforofで使われるiteraterを一意のもの（既存のiteraterメソッド）にすれば世の中にすでに作られ運用されているiteraterメソッドに干渉することなく、イテレーターの機能を公式で用意できる
参考: https://qiita.com/naruto/items/312adeb6145eb6221be7#%E7%90%86%E7%94%B1%E3%81%AF%E4%BA%92%E6%8F%9B%E6%80%A7
5, Dateはなぜ比較されることのない文字列で返される？
→"Thu Jan 11 2024 23:02:31 GMT+0900 (GMT+09:00)"のように人が読みやすい形式で表示したり,日付を文字列としてほかのシステムに送信したりするのに便利
　比較はミリ秒にして行うが、はじめからそのままだとわかりにくいから？
6, 数値が必要とされる場所に文字列を入力した場合は無理やり数値に変換されるのか？
- （ChatGPTの回答）数値から文字列の変化はどれだけ桁が大きいとも予測は1つになる。だが、例えば"123abc"という文字列を数値に変換しようとすると、結果が予測できない。JavaScriptではこの場合NaNが返され、意図しない型変換が発生したことを認識できる。動的型付け言語なので、実行しないとこの変換が正しいかどうかわからなく、安全性が確保できない。

7, BIGINTを使う機会は？
-　大きな数値を扱う科学的な計算とか統計学とか？, 暗号どうしても使いたい場合は以下を参照し対策を講じるようvMDNリファレンスにあった
https://timing.attacks.cr.yp.to/basics.html

8, JavaScriptでは引数で与えられた内容に対するチェックをどこまでするべきなのか
 →個人的には関数の中に例外処理を書いている。JavaDocを書いたうえで、ファイルの先頭に //@ts-checkを入れると、正しくない引数が渡されている場合にはエラーを事前に出してくれる。
 @ts-check ... TypeScriptコンパイラや、TypeScriptを標準で型チェックできる VSCode により、JavaScriptファイルに対してTypeScript相当の型チェックを行う事ができる仕組み
 https://blog.manaten.net/entry/ts-check-for-legacy

9, unicode文字コードって言う？→言わない
10 Unicodeの正規化を行うのはどんな時があるの？
    →テキストの検索機能とかソート機能を実装する際、正規化を行うことで一貫した結果をえることができる。dif（ファイル差分の確認）とかでも正規化しないと全く変更加えてないファイルなのにデータ量とかが変わってくる。
    OSによって正規化されるのはファイル名のみ？プログラムの中身はOSによって勝手に正規化されない？気がする
