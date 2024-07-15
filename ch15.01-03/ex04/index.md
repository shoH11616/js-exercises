・グローバルオブジェクトを参照する方法
ブラウザ内: windowオブジェクトがグローバルオブジェクトとして使用。
Node.js内: globalオブジェクトがグローバルオブジェクトとして使用。
ブラウザ/Node.js問わず: thisキーワードをグローバルスコープで使用すると、グローバルオブジェクトを参照。

・ブラウザ独自のグローバルオブジェクトのプロパティとメソッド
window: グローバルオブジェクト自体を参照。
document: 現在のHTMLドキュメントを表すDocumentオブジェクトを参照。
location: 現在のURLを表すLocationオブジェクトを参照。
history: ブラウザの履歴を表すHistoryオブジェクトを参照。
navigator: ブラウザと実行環境の情報を表すNavigatorオブジェクトを参照。
localStorage: ブラウザのローカルストレージにアクセスするためのStorageオブジェクトを参照。
sessionStorage: ブラウザのセッションストレージにアクセスするためのStorageオブジェクトを参照。
alert(): ユーザーにアラートダイアログを表示。
confirm(): ユーザーに確認ダイアログを表示し、ユーザーの応答を取得。
prompt(): ユーザーにプロンプトダイアログを表示し、ユーザーの入力を取得。

・グローバルオブジェクトにundefinedが定義されていることはconsole.log(undefined);で確認できる
・過去のECMAScript（JavaScriptの標準）では、undefinedは変数であり、値を代入することが可能だったが、未定義の値を表す特別なものにもかかわらず、undefinedの値を変更可能であるがという問題を引き起こした。
