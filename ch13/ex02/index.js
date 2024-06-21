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

function f1() {
  // NOTE: f2 との比較用 (注: () => wait(...) は () => { return wait(...); } と同じことに注意
  //
  // 回答:
  // 3秒後に A が出力され、その2秒後に B が出力され、その1秒後に C が出力される。
  //
  // 説明:
  // wait3 の解決後に logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されるため。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                                 wait1
  //                                |-----|
  //                                       logC
  //                                      |-|
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}

function f2() {
  // NOTE: 2つ目の then の中で return が無くなっていることに注意 (典型的なミス)
  //
  // 解答例:
  // 3秒後に A が出力され、その1秒後に C が出力され、その1秒後に B が出力される。
  // 2つ目の .then のコールバック関数が値を return していないため、この .then が返す Promise は即解決される。
  // このため logA() の実行すぐ後に wait1().then(...) が実行され C が先に出力される。
  //
  // 図解:
  //  wait3
  // |---------------|
  //                  logA
  //                 |-|
  //                    wait2
  //                   |----------|
  //                               logB
  //                              |-|
  //                  wait1
  //                 |-----|
  //                        logC
  //                       |-|
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}

function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  // 解答：c,a,Error: Xが出力
  // 理由：finallyブロックが同期的に実行
  // ⇒Promiseチェーンの最初のthenが解決されAが出力]
  //⇒次のthenでエラーがスローされるが、非同期のPromiseチェーン内のエラーはcatchしないためBの出力はない。
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}

function f4() {
  // NOTE: f5 との比較用
  // 解答：2秒後に"A"を出力し、その1秒後に"B"を出力し、その後に"100"を出力。
  // 理由：thenメソッドのコールバック関数がPromiseを返すと、
  // そのPromiseの解決値が次のthenに渡されるから。
  // 新しいやつ：wait2()この関数はおそらく2秒間待つPromiseを返す
  // ⇒.then(() => { logA(); return 40; })wait2()が解決された（つまり2秒後）、logA()関数が呼び出されて"A"が出力され、その後に40が次の.thenメソッドに渡される。
  // ⇒ .then((value) => wait(1000).then(() => { logB(); return 100; }))：40が渡されるが、これは使用されずその後、wait(1000)が呼び出されて1秒間待ち、その後にlogB()関数が呼び出されて"B"が出力。100が次のthenに渡される
  // ⇒.then((v) => log(v)); 100が出力
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  // 解答：B⇒A⇒40と出力
  // 理由：wait1().then(...)が最初に実行されBが出力。
  // ただしその結果は次のthenには渡らない
  // ⇒wait2().then(...) の中の then が解決されAが出力
  // ⇒wait2().then(...) の最初の then が 40 を返すため、これが次のthenに渡され40が出力
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      })
    )
    .then((v) => log(v));
}

function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  // 解答：1秒後に"A"を出力し、その1秒後に"B"を出力し、その2秒後に"C"を出力。
  // 理由：同じPromiseに対してthenを複数回呼び出すと、それぞれのthenは独立して動作する。
  // 新：const p = wait1().then(logA);1秒間待つPromiseが返された後。logA()関数が呼び出されて"A"が出力
  // ⇒ p.then(() => wait1()).then(logB);この.thenメソッドのコールバック関数は、再びwait1()関数を呼び出して1秒間待つPromiseを返す。logB()関数が呼び出されて"B"が出力
  // ⇒ p.then(() => wait2()).then(logC); wait2()関数を呼び出して2秒間待つPromiseを返す。Cを出力。

  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}

function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  // 解答：1秒後に"A"を出力し、その2秒後に"B"を出力し、その後に"C"を出力。
  // 理由：すでに解決済みのPromiseのthenを呼び出すと、そのコールバック関数は即座にスケジュールされるから。
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}

function f8() {
  // NOTE: f9, f10 との比較用
  // 解答：1秒後に"X"を出力し、その後に"A"を出力。
  // 理由：catchメソッドはPromiseチェーン内の最初のエラーを捕捉するから。
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f9() {
  // NOTE: f12 との比較用
  // 解答：1秒後に"Y"を出力し、その後に"A"を出力。
  // 理由：thenメソッドのコールバック関数がエラーをスローすると、そのエラーは次のcatchに渡されるから。
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}

function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  // 解答：A⇒エラーYがスロー
  // 理由：finalluブロックが同期的に実行され、そのあとエラーYがthrowされるが、このエラーは非同期内なためcatchでは補足されない。
  // ⇒then(r, c)は前のPromiseが解決された場合にrを呼び出し拒否された場合にcを呼び出すが、
  // ⇒then(r).catch(c)は前のPromisega解決された場合にrを呼び出し、rがエラーをthrowした場合にcを呼び出す。
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}

function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  // 解答："X"を出力。
  // 理由：new Promiseの実行関数内でスローされたエラーは、そのPromiseを拒否し、次のcatchに渡されるから。
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}

function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  // 解答：Error: X
  // 理由：setTimeout内でスローされたエラーは、そのPromiseの外部で発生するため、そのPromiseのcatchでは捕捉できないから。
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}

// f1();
// f2();
// f3();
// f4();
// f5();
// f6();
// f7();
// f8();
// f9();
// f10();
// f11();
f12();
