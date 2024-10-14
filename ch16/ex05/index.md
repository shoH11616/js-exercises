# 用語の概要

## 標準入力 (stdin)

プログラムが外部からデータを受け取るためのストリーム。通常はキーボード入力が標準入力として扱われる。

## 標準出力 (stdout)

プログラムが処理結果やメッセージを出力するためのストリーム。通常はコンソールやターミナルに表示される。

## 標準エラー出力 (stderr)

エラーメッセージや警告メッセージを出力するためのストリーム。標準出力とは別のストリームで、エラーメッセージの出力に使われる。

## リダイレクト

標準入力、標準出力、標準エラー出力のストリームを別の場所に転送する操作。例: 標準出力をファイルに保存する。

## パイプ

複数のプログラムを連携させるために、あるプログラムの出力を別のプログラムの入力として接続する機能。UNIX系のシェルでよく使われる。

# 実験結果の予測

## 1. `node cat.mjs`

- **予測結果**: 標準入力からデータを受け取るため、何も入力されない限り何も表示されない。
- **結果**: 入力しない限り何も出力されない。入力するとそれがそのまま返され表示される。

## 2. `echo FOO | node cat.mjs`

- **予測結果**: `echo` コマンドの出力 "FOO" が標準入力として渡され、それが標準出力に表示される。
  - 出力: `FOO`
- **結果**: `FOO`が出力

## 3. `node cat.mjs > output.txt`

- **予測結果**: 標準入力からデータを受け取るため、何も入力されない限り `output.txt` は空のファイルとなる。
- **結果**: 入力しない限り空の`output.txt` が同じディレクトリに作られる。入力するとその内容がファイルに転写される。ただし日本語は文字化けした。

## 4. `node cat.mjs file`

- **予測結果**: `file` の内容が標準出力に表示される。
  - 出力: `file` の内容
- **結果**:`file` の内容が出力

## 5. `node cat.mjs file > output.txt`

- **予測結果**: `file` の内容が `output.txt` に書き込まれる。
  - `output.txt`: `file` の内容が保存される
- **結果**:`file` の内容が保存されているようだったが、全部文字化け。

## 6. `node cat.mjs invalid-file > output.txt`

- **予測結果**: 存在しないファイルを読み込もうとするため、エラーが発生し、`output.txt` は空のファイルとなる。コンソールにはエラーメッセージが表示される。
  - `output.txt`: 空のファイル
  - コンソール出力: エラーメッセージ
- **結果**:エラーメッセージが出力。
  node:events:492
  throw er; // Unhandled 'error' event
  ^

Error: ENOENT: no such file or directory, open 'C:\Users\mikis\OneDrive\デスクトップ\仕事用\JavaScriptKenshu\exercises-main-exercises\js-exercises\ch16\ex05\invalid-file.js'
Emitted 'error' event on ReadStream instance at:
at emitErrorNT (node:internal/streams/destroy:151:8)
at emitErrorCloseNT (node:internal/streams/destroy:116:3)
at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
errno: -4058,
code: 'ENOENT',
syscall: 'open',
path: 'C:\\Users\\mikis\\OneDrive\\デスクトップ\\仕事用\\JavaScriptKenshu\\exercises-main-exercises\\js-exercises\\ch16\\ex05\\invalid-file.js'
}

Node.js v20.10.0

## 7. `node cat.mjs invalid-file 2> error.txt`

- **予測結果**: 存在しないファイルを読み込もうとするため、エラーが発生し、そのエラーメッセージが `error.txt` に書き込まれる。
  - `error.txt`: エラーメッセージが保存される
- **結果**:エラーメッセージがテキストファイルに保存。
