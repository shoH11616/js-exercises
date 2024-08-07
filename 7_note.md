1.凍結されたオブジェクトは一般的なJavaScriptのテストがうまく動かなくなることがあるとありますが、具体的にはどのようなケースで発生しますか？⇒モックとか

2.JavaScriptのフレームワークとしては、Next.jsとかスベルテキットなどが便利に使われている。ただ作成したテストというかプレイライトみたいなのがあると良い。

3. タイプスクリプトはJavaScriptにあくまで最終的に変換されるもの。よってTypeScriptのコードをブラウザに張り付けても意味がない。
   JavaScript以外だと、ウェブブラウザで画像処理とか音声処理を高度にやりたいという場合はwebアセンブリが代用になる。ただC言語とかで書いたものをJavaScriptにコンパイルする構造になっているので、結局はJavaScriptになる。

4. コードバンドリングツールっていうのはwebパックとかJavaScriptのやつをまとめる

5. DomcontentLoadedってモジュールとかでファー使う前提で使うことある？⇒フレームワークを使う場合はロードの町などは全部そっちでやってくれる。モジュールを使うならDOMCONは使わなくていい。組み込み機器向けなど古いブラウザ向けならモジュールが使えずという話はありそう。

6. クライアントにもエラーがわかるような形でログを出力したほうがいい

7. integrity属性 .... スクリプトとかに着けてあげる、つけるのはダウンロードする値のハッシュリを付けてあげるといい。書き換えられた時に気づけるっていうのがとても意味ある。あとはjqueryをブラウザリンクで読み込むCDNとかやると、その読み込み元が悪意あるソースを提供したときにintegrityで気づくことができる。

8. ドメインが違うところには通信に制限できなくなる⇒document.domainはやめておいた方がいい。もしこの制限を緩和するならば、クロスオリジンポリシーを使用したほうがいい。

9.　deferとアシンクは結局HTMLをパースする時間は変わらない。パース時点でjquery終わってる。アシンク属性を使うとDOMCONTENTロードが発火しない可能性がある。なのでアシンク使う場合は必ずロードで待たなければいけない。アシンクとでファーで読み込み時間が違う。defer属性のあるスクリプトは文書が現れた淳に実行が走る。アシンク使ってあげればJqueryがダウンロード終わってなくてもローダッシュとかがダウンロード語すぐに実行できる。
ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
・AppScanやInsightVMとかを業務で使っている、これで操作を行うと
・基本的にフレームワーク経由でやるのがいい。ただHTML読めないとなにか問題出たときに対処法がわからない。
・NodejsとかReact入れると今はそれが勝手にWebpackなどのバンドルツールを勝手に選んで導入してくれる。フレームワーク使う時点でバンドルツールも自動的に決まってるイメージ。
・AppScanとかInsidhtVMとかが吐き出すエラーの中にReactが構築したHTMLもある。なのでこういう原因を特定する際にこれが重要になる。