/* eslint-disable no-undef */

document.addEventListener("DOMContentLoaded", () => {
  // 'DOMContentLoaded'イベントは、初期HTML文書が完全に読み込まれて解析されたときに発生する。
  $("div#1000").html(_.capitalize("hello"));
  // jQueryを使って、IDが'1000'のdiv要素のHTML内容を変更する。
  // '_'.capitalizeはLodashの関数で、文字列の最初の文字を大文字にし、残りの文字を小文字にする。
  // したがって、この行は"hello"を"Hello"に変換し、その結果をdiv要素の内容として設定する。
});
