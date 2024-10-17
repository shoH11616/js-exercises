import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

/**
 * node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
 * @returns {Promise} プロセスの終了時に解決されるPromise
 */
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  // 標準出力のデータを取得してコンソールに出力する
  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  // 標準エラー出力のデータを取得してコンソールに出力する
  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    // 子プロセスが終了した時の処理
    child.on("close", (code, signal) => {
      if (code !== 0) {
        console.error(`Child process exited with code ${code}, restarting...`);
        startChild(); // 再起動
      } else {
        res([code, signal]);
      }
    });
  });
}

/**
 * シグナルをトラップする関数
 * @param {string} signal 受け取ったシグナル
 */
function handleSignal(signal) {
  console.log(`Received ${signal}, forwarding to child process...`);
  if (child) {
    child.kill(signal); // 子プロセスにシグナルを送る
    child.on("exit", () => {
      console.log(`Child process exited due to ${signal}`);
      process.exit(0); // 自身も終了する
    });
  }
}

// シグナルのトラップ
["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => handleSignal(signal));
});

// 初回の子プロセス起動
startChild();
