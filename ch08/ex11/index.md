1. 組み込み関数(Math.max.toString())の場合
   出力結果：function max() { [native code] }
   Math.max関数のソースコードがネイティブコード（JavaScriptエンジンに組み込まれたC++などの低レベル言語で書かれたコード）であることを示している。

2. 自作関数(myFunction.toString())の場合
   出力結果：function myFunction(x, y) { return x + y; }
   myFunction関数のソースコードをそのまま文字列として返している。
