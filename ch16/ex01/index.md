# マルチスレッドとは

マルチスレッドは、一つのプロセス内で複数のスレッド（軽量プロセス）を実行する技術。これにより、複数のタスクを同時に効率よく処理できる。

## メリット

- **同時実行**: 複数のスレッドが同時に動作し、タスクの待ち時間を短縮。
- **リソース共有**: スレッド間でメモリやファイルなどのリソースを共有可能。

## デメリット

- **複雑性**: スレッド間の同期や競合を管理する必要があり、プログラムが複雑になる。
- **デバッグ難易度**: バグの追跡が難しく、特にデッドロックやレースコンディションの問題が発生しやすい。

# 実行結果

以下は `node mFib.js 45 4` を実行した際の出力結果。

## コンソール出力

- Worker 1 execution time: 1.088s
- Worker 0 execution time: 1.740s
- Worker 2 execution time: 2.780s
- Worker 3 execution time: 4.482s
- Total execution time: 4.488s
- Fibonacci number: 1836311902

## OS機能で確認したスレッド数

- node.exe のスレッド数:　20
