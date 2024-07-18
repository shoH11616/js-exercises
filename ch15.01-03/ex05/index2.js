window.addEventListener("load", () => {
  // 'load'イベントは、ページ全体（画像やスタイルシートなどを含む）が完全に読み込まれたときに発生する。
  document.getElementById("1000").innerHTML = "Hello";
  // IDが'1000'の要素のHTML内容を変更する。
  // 'innerHTML'プロパティを使って、要素の内容を指定した文字列に置き換える。
});
