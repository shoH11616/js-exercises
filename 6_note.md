1.  ・Too　Many　リクエストなどのAPIの制限をする。
    ・テストとかで他社のAPIは絶対に使わない方がいい。サーバー落とす可能性がある。
    ・Mockとかちゃんと使いましょう。Promise.allじゃない時も注意

2.  並行処理⇒１つのスレッドで1津のタスクがさばかれる。並列⇒複数のスレッドで負狂う
    ・JavaScriptに関してはシングルスレッドで合ってる。ただしフェッチとかはJavaScriptの外も関係するので、それは並列で行われる。

3.  カレントタスクでブロックするような処理は絶対しない。非同期処理によってながーい操作はブロックしないでやるように。無限ループのようなものはもってのほか（実業務でこんなとんでもない処理はしない）重たい処理はサーバー側でやらせることもある。イベント系のタスクはマクロタスクキューに積まれる。

4.  promiseの引数として渡される関数は即時実行される。

5.  new Promiseを補足したい場合は、setTimeoutの中にtrycatchを書いてあげて、外にrejectを出してあげてPromiseでcatchするようにする

6.  jQueryのほうのPromiseの方が古い。なのでJavaScript標準のPromiseとは少し違う。

7.
