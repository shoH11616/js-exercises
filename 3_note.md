1,object.createは新しいプロトタイプを作る。コピーするのはObject.assingn()を使用する。
　ただディープコピーではなくナローコピーになってしまう（参照が引き継がれたりする）
　JSONへの書き換えやリストラクチャークローンでディープコピーができる。

2クラスとプロトタイプの違いについて
　クラスを表現するのにプロトタイプをもとにつながってClassキーワード

3 classキーワードが出てきてからは基本Object.create()を使うことはあまりない。

4 基本的に何かを羅列する時は、Mapとかを使った方がいい。

5 object.createで継承されたプロパティはあくまで「親のプロトタイプのプロパティ」
　object.assignとスプレッド演算子は「独自のプロパティとして持つ」
　この違いがあるので前者はエディタでプロパティとして候補に出てこない。
　継承とコピー結局何が違うの？→メソッドの観点で見ると違いが分かりやすい。

6 振る舞いを変えたい場合は継承よりも委譲。継承を使う場面があんまりない。

7 不思議なふるまい→メソッドぽくかいてるのにゲッターで書くとプロパティみたいにかける。

8 ハッシュテーブル→定数オーダーで使用する。配列としていろんなものを詰め込むと非常に計算量が多くなる。ハッシュテーブルを使うとやりやすい

9 プロミス ... 文字列そのものではなく

10... 配列のようなオブジェクト→配列に似ている機能だけど、要らない機能などを削ったものとか（特にHTMLCollectionなど）

11 行列の計算に関しては長さを変えたり値を変えたりしてテストを作成したほうがいい。
　 テストでバグを発見することを意識する。

12 オーfだー記法 ... プログラムを書く上で処理速度やパフォーマンスは常に気にしてほしい。しっかり覚えること。

13 テストファーストで考える。
