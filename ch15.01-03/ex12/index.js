(() => {
  // タスクと合計時間を保存するための変数を初期化
  var tasks = [];
  var total = 0;

  // ユーザーからタスクの情報を収集するループ
  while (true) {
    var task = prompt(
      "タスクの名前を入力してください（終了するにはキャンセルを押してください）"
    );
    // キャンセルが押された場合はループを終了
    if (task === null) break;

    // 予想時間と実際の時間を入力させる
    var expected = parseFloat(prompt("予想時間を入力してください（例：2）"));
    var actual = parseFloat(prompt("実際の時間を入力してください（例：2.5）"));

    // 入力が数値である場合は、タスクを配列に追加
    if (!isNaN(expected) && !isNaN(actual)) {
      var difference = actual - expected;
      tasks.push({
        task: task,
        expected: expected,
        actual: actual,
        difference: difference,
      });
      // 合計時間を更新
      total += actual;
    } else {
      // 入力が数値でない場合は警告を表示
      alert("無効な入力です。数値を入力してください。");
    }
  }

  // タスク一覧のメッセージを作成
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
  // 合計時間をメッセージに追加
  message += "合計時間: " + total + "\n";
  // 合計時間が7.5時間を超えている場合は警告を追加
  if (total > 7.5) {
    message += "警告: 合計時間が7.5時間を超えています！";
  }

  alert(message);
})();
