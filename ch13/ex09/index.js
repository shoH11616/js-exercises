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

async function i1() {
  // 解答：42と100が出力
  // 理由：wait1が最初に解決され、42がvに代入されｒｙ、その後wait2によってvが100に更新されるから。
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
}

async function i2() {
  // 解答：C、B、A、["A", "B", "C"]の出力
  // 理由：すべてのwaitを解決するのを待ち、それぞれのＰｒｏｍｉｓｅは指定した時間が経過した後に、指定した文字列を研ぐに出力するため。
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}

async function i3() {
  // 解答：Y、42、B、0と出力
  // 理由：wait3でエラーがすぐにcatchブロックで捕捉される（Yと42が出力）。その2秒後にBが出力。Promise.allは最初のエラー以外は無視されるためwait1のエラーは無視される。そのごawait wait3でまたされていたvの出力がされる（vは0に初期化されているので0が出力）
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}

async function i4() {
  // 解答：01234COMPLETEDと出力
  // 理由：wait((5 - i) * 1000).then(() => log(i))が五回実行。
  // それぞれのPromiseは指定した時間が経過した後にiの値をログに出力。
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

async function i5() {
  // 解答：COMPLETED43210と出力
  // 理由：i5 関数では、wait((5 - i) * 1000).then(() => log(i)) が5回実行されるが、それぞれの Promise が同時に開始されるため、待機時間が長い Promise から順にログに出力。ただしp.then(() => log("COMPLETED"))が最初に実行されてしまう。
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}

async function i6() {
  // 解答：4、3、2、1、0、COMPLETEDと出力
  // 理由：wait((5 - i) * 1000).then(() => log(i)) を5回実行。すべてのPromiseが同時に実施。
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i)))
  ).then(() => log("COMPLETED"));
}

async function i7() {
  // 解答：１０が出力
  // 理由：p1 と p2 の2つの非同期処理を並列に実行されるため。
  // NOTE: i8 との比較用
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

async function i8() {
  // 解答：5が出力
  // 理由：i7と同じように非同期処理の並列実行が行われるが、v の値の更新の間に await があるため、v の値の更新が競合する。
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}

// i1();
// i2();
// i3();
i4();
// i5();
// i6();
// i7();
// i8();
