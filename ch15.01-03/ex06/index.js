var txt = "";
// ブラウザのコード名を取得
txt += "<b>Browser CodeName:</b> " + navigator.appCodeName + "<br>";
// ブラウザの名前を取得
txt += "<b>Browser Name:</b> " + navigator.appName + "<br>";
// ブラウザのバージョンを取得
txt += "<b>Browser Version:</b> " + navigator.appVersion + "<br>";
// ブラウザでクッキーが有効かどうかを取得
txt += "<b>Cookies Enabled:</b> " + navigator.cookieEnabled + "<br>";
// ブラウザの言語を取得
txt += "<b>Browser Language:</b> " + navigator.language + "<br>";
// ブラウザがオンラインかどうかを取得
txt += "<b>Browser Online:</b> " + navigator.onLine + "<br>";
// ブラウザが動作しているプラットフォームを取得
txt += "<b>Platform:</b> " + navigator.platform + "<br>";
// ブラウザのユーザーエージェントヘッダーを取得
txt += "<b>User-agent header:</b> " + navigator.userAgent + "<br>";

// IDが'demo'の要素のHTML内容を作成した文字列で置き換える
document.getElementById("demo").innerHTML = txt;
