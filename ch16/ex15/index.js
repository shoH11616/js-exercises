const threads = require("worker_threads");

if (threads.isMainThread) {
  let num = 0;
  let worker = new threads.Worker(__filename);

  // ワーカーがオンラインになったときの処理
  worker.on("online", () => {
    for (let i = 0; i < 10_000_000; i++) {
      num++; // スレッドセーフでないインクリメント
    }

    // ワーカーからメッセージを受け取ったときの処理
    worker.on("message", (message) => {
      if (message === "increment") {
        num++; // サブスレッドからのインクリメント命令に応答
      } else if (message === "done") {
        // 両方のスレッドが終了したら期待通りの値を確認
        console.log(num); // 期待通りの20,000,000になっていることを確認
      }
    });
  });
} else {
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage("increment"); // メインスレッドにインクリメントを依頼
  }
  threads.parentPort.postMessage("done"); // 処理終了の通知
}
