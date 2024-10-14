constthreads = require("worker_threads");
if (threads.isMainThread) {
  letsharedBuffer = newSharedArrayBuffer(4);
  letsharedArray = new Int32Array(sharedBuffer);
  letworker = newthreads.Worker(__filename, { workerData: sharedArray });
  worker.on("online", () => {
    for (leti = 0; i < 10_000_000; i++) {
      Atomics.add(sharedArray, 0, 1); //スレッドセーフでアトミックなインクリメント。
    }
    worker.on("message", (message) => {
      //両方のスレッドが終了したら、スレッドセーフな関数を使って
      //共有配列を読み込み、期待通りの20,000,000という値になって
      //いることを確認する。
      console.log(Atomics.load(sharedArray, 0));
    });
  });
} else {
  let sharedArray = threads.workerData;
  for (let i = 0; i < 10_000_000; i++) {
    Atomics.add(sharedArray, 0, 1); // スレッドセーフでアトミックなインクリメント。
  }
  threads.parentPort.postMessage("done");
}
