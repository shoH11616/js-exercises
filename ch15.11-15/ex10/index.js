// index.js

/**
 * 画像ファイルの入力イベントリスナーを設定
 */
document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0]; // 選択されたファイルを取得
  if (!file) {
    return; // ファイルが選択されていない場合は処理を終了
  }

  const img = new Image(); // 新しいImageオブジェクトを作成
  const reader = new FileReader(); // 新しいFileReaderオブジェクトを作成

  // ファイルの読み込みが完了したときの処理
  reader.addEventListener("load", (e) => {
    img.src = e.target.result; // 読み込んだデータをImageオブジェクトのソースに設定
  });

  // 画像の読み込みが完了したときの処理
  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original"); // 元画像を表示するキャンバス
    const filteredCanvas = document.getElementById("filtered"); // フィルタ処理後の画像を表示するキャンバス
    const originalCtx = originalCanvas.getContext("2d"); // 元画像キャンバスのコンテキスト
    const filteredCtx = filteredCanvas.getContext("2d"); // フィルタ処理後の画像キャンバスのコンテキスト

    originalCanvas.width = img.width; // キャンバスの幅を画像の幅に設定
    originalCanvas.height = img.height; // キャンバスの高さを画像の高さに設定
    filteredCanvas.width = img.width; // フィルタ処理後のキャンバスの幅を画像の幅に設定
    filteredCanvas.height = img.height; // フィルタ処理後のキャンバスの高さを画像の高さに設定

    originalCtx.drawImage(img, 0, 0); // 画像を元画像キャンバスに描画

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height); // キャンバスから画像データを取得

    // ガウシアンフィルタのカーネル
    const kernel = [
      [1, 4, 7, 4, 1],
      [4, 16, 26, 16, 4],
      [7, 26, 41, 26, 7],
      [4, 16, 26, 16, 4],
      [1, 4, 7, 4, 1],
    ];
    const kernelSize = 5; // カーネルのサイズ
    const kernelSum = 273; // カーネルの合計値

    const worker = new Worker("./worker.js"); // 新しいWeb Workerを作成

    // Web Workerにメッセージを送信
    worker.postMessage({ imageData, kernel, kernelSize, kernelSum });

    // Web Workerからメッセージを受信したときの処理
    worker.addEventListener("message", (e) => {
      const { outputData, width, height } = e.data; // 受信したデータを取得
      const outputImageData = new ImageData(outputData, width, height); // 新しいImageDataオブジェクトを作成
      filteredCtx.putImageData(outputImageData, 0, 0); // フィルタ処理後の画像データをキャンバスに描画
    });
  });

  reader.readAsDataURL(file); // ファイルをデータURLとして読み込む
});
