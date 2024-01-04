予想: ①値が42のanswerプロパティを持ったobjectが出力, ②値が0のanswerプロパティを持ったobjectが出力
結果: ①②共に値が0のanswerプロパティを持ったobjectが出力された
比較の結果: 【開発者ツールを開いた状態のタブで HTML を開く場合】→予想の通り出力 【HTML を開いた状態のタブで開発者ツールを開く場合
】→ 結果の通り出力
修正点: 
<!DOCTYPE html>
<html>
  <body>
    <script>
      let life = { answer: 42 };
      console.log('最初のlife:', { ...life }); // lifeオブジェクトを複製してログに出力
      life.answer = 0;
      console.log('変更後のlife:', life);
    </script>
  </body>
</html>
に変更