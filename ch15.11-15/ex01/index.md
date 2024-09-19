1. index.js で document.cookie プロパティを console.log で表示する
   ・空文字のコンソールログが出力
   ・理由：sid：0acc54aa-8fe2-4db8-91d4-1867961405a4が表示されるかと思ったが表示されなかった。原因不明

2. ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する
   ・sid：0acc54aa-8fe2-4db8-91d4-1867961405a4
   ・理由：サーバーが設定したcookieがブラウザに保存されているから

3. ToDo アプリのタブをリロードする
   ・ToDoリストの内容や状態が保持される
   ・理由：同じセッションIDが使われてるので、サーバー側で管理されてるタスク一覧が同じままになる。

4. 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する
   ・ToDoリストの状態は同一に保たれる。片方でToDoを追加したり、完了のステータスに持ってっても、もう片方をリロードすればそれと同じ状態になる。
   ・理由：3と同様の理由

5. シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する
   ・シークレットウィンドウ：元のToDoリストとは独立した異なるToDoリストが生成されている。同一じゃない。
   ・異なるブラウザ（chromeとedge）：元のToDoリストとは独立した異なるToDoリストが生成されている。同一じゃない。
   ・理由：シークレットウィンドウや異なるブラウザでは新しいセッションが作成され、異なるセッションIDが使用されることになるから。

6. http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する
   ・元のToDoリストとは独立した異なるToDoリストが生成されている。同一じゃない。
   ・理由：localhost と 127.0.0.1でそれぞれDomain属性が設定されているため、異なるドメインとしてみなされる。セッションIDも別のものだから。