javascript: (function () {
  var tasks = [];
  var total = 0;

  while (true) {
    var task = prompt(
      "タスクの名前を入力してください（終了するにはキャンセルを押してください）"
    );
    if (task === null) break;

    var expected = parseFloat(prompt("予想時間を入力してください（例：2）"));
    var actual = parseFloat(prompt("実際の時間を入力してください（例：2.5）"));

    if (!isNaN(expected) && !isNaN(actual)) {
      var difference = actual - expected;
      tasks.push({
        task: task,
        expected: expected,
        actual: actual,
        difference: difference,
      });
      total += actual;
    } else {
      alert("無効な入力です。数値を入力してください。");
    }
  }

  var message = "タスク一覧:\n";
  for (var i = 0; i < tasks.length; i++) {
    message +=
      "タスク: " +
      tasks[i].task +
      ", 予想時間: " +
      tasks[i].expected +
      ", 実際の時間: " +
      tasks[i].actual +
      ", 差異: " +
      tasks[i].difference +
      "\n";
  }
  message += "合計時間: " + total + "\n";
  if (total > 7.5) {
    message += "警告: 合計時間が7.5時間を超えています！";
  }

  alert(message);
})();
