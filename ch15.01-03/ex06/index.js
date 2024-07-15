var txt = "";
txt += "<b>Browser CodeName:</b> " + navigator.appCodeName + "<br>";
txt += "<b>Browser Name:</b> " + navigator.appName + "<br>";
txt += "<b>Browser Version:</b> " + navigator.appVersion + "<br>";
txt += "<b>Cookies Enabled:</b> " + navigator.cookieEnabled + "<br>";
txt += "<b>Browser Language:</b> " + navigator.language + "<br>";
txt += "<b>Browser Online:</b> " + navigator.onLine + "<br>";
txt += "<b>Platform:</b> " + navigator.platform + "<br>";
txt += "<b>User-agent header:</b> " + navigator.userAgent + "<br>";

document.getElementById("demo").innerHTML = txt;
