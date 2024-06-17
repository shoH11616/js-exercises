/**
 * 指定された時間後に解決される Promise を返す
 * @param  {number}   msec    - 返り値の Promise を解決するまで待つ時間 (ミリ秒)
 * @return {Promise}  Promise - 指定時間後に解決される Promise
 */
function wait(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

// 0, 1, 2, 3 秒待つ
const wait0 = () => wait(0);
const wait1 = () => wait(1000);
const wait2 = () => wait(2000);
const wait3 = () => wait(3000);

// ログ出力
const log = (v) => console.log(v);
const logA = (v) => console.log("A");
const logB = (v) => console.log("B");
const logC = (v) => console.log("C");

// 例外
const errX = () => {
  throw new Error("X");
};
const errY = () => {
  throw new Error("Y");
};

async function h1() {
  // 解答：3秒後に “A”、その2秒後に “B”、その1秒後に “C” が出力
  // 理由：wait3()、logA()、wait2()、logB()、wait1()、logC() の順に実行されるから。
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}

function h2() {
  // NOTE: h3 との比較用
  // 解答：“X” が即座にログに出力
  // 理由：エラーがスローされ、キャッチブロックが実行されるから。

  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}

function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  // 解答： “X” が即座にログに出力
  // 理由：Promiseのコンストラクタに渡される関数が非同期関数であるため、エラーはPromiseチェーンによって補足され、catchブロックが実行されるから。

  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  // 解答：Yが出力
  // 理由：wait1が先に終了されるためerrYが実行。p1のawaitが完了するまでp2のawaitは開始されないため、errXのエラーは補足されない。

  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}

h1();
// h2();
// h3();
// h4();
