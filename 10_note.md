【質問】

1. node以外を使うことあるの？
   ・Denoとかもある。JsだけじゃなくてTSもネイティブで実行できるのが特徴。
   ・シェアは圧倒的にnode

2. 非同期とノンブロッキングの言葉の違いは？
   ・非同期⇒JavaScriptでコールバックで返すやつ。アシンクアウェイトのもの。
   ・ノンブロッキング⇒JSの外部の者に対して処理をリクエストするもの。

3. シングルスレッドでのイベントループで高負荷が掛かる可能性ないの？
   ・ある。大量のリクエストが来たとき
   ・JSだけで対策する必要はない。サーバーサイドで対策（LoadBalancerによる散らし・単純なサーバー強化など...）
   ・httpリクエストできてJSONで処理するとか、一般的な処理はnodeで十分（ほとんどこれ）

【問題】

1. `node cat.mjs invalid-file 2> error.txt`
   ・2>はリダイレクトの証。
