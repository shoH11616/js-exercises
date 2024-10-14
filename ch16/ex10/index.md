PS C:\Users\mikis\OneDrive\デスクトップ\仕事用\JavaScriptKenshu\exercises-main-exercises\js-exercises\ch16\ex10> node --expose-gc --trace-gc uploadWithStream.js
[18624:0000019FD1B789E0] 26 ms: Scavenge 4.3 (4.4) -> 3.8 (5.4) MB, 0.40 / 0.00 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[18624:0000019FD1B789E0] 36 ms: Scavenge 4.8 (5.9) -> 4.4 (6.4) MB, 0.35 / 0.00 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[18624:0000019FD1B789E0] 44 ms: Scavenge 5.3 (6.4) -> 4.7 (6.9) MB, 0.32 / 0.00 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[18624:0000019FD1B789E0] 58 ms: Scavenge 5.7 (6.9) -> 5.2 (9.7) MB, 0.30 / 0.01 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[18624:0000019FD1B789E0] 132 ms: Scavenge 7.5 (10.1) -> 5.8 (10.3) MB, 0.22 / 0.00 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[18624:0000019FD1B789E0] 180 ms: Scavenge 7.4 (10.3) -> 6.0 (10.6) MB, 0.15 / 0.00 ms (average mu = 1.000, current mu = 1.000) external memory pressure;
[18624:0000019FD1B789E0] 257 ms: Scavenge 7.3 (10.6) -> 6.0 (10.6) MB, 0.11 / 0.00 ms (average mu = 1.000, current mu = 1.000) external memory pressure;
File uploaded successfully

PS C:\Users\mikis\OneDrive\デスクトップ\仕事用\JavaScriptKenshu\exercises-main-exercises\js-exercises\ch16\ex10> node --expose-gc --trace-gc uploadWithRead.js
[32384:0000027EC04BAD30] 28 ms: Scavenge 4.3 (4.4) -> 3.7 (5.4) MB, 0.44 / 0.00 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[32384:0000027EC04BAD30] 38 ms: Scavenge 4.8 (5.9) -> 4.4 (6.4) MB, 0.35 / 0.00 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[32384:0000027EC04BAD30] 46 ms: Scavenge 5.3 (6.4) -> 4.7 (6.9) MB, 0.28 / 0.00 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[32384:0000027EC04BAD30] 87 ms: Scavenge 5.7 (6.9) -> 5.2 (9.7) MB, 0.42 / 0.01 ms (average mu = 1.000, current mu = 1.000) allocation failure;
[32384:0000027EC04BAD30] 88 ms: Mark-Compact 5.3 (9.7) -> 4.5 (9.7) MB, 0.70 / 0.01 ms (+ 0.0 ms in 1 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 32 ms) (average mu = 1.000, current mu = 1.000) finalize incremental marking via stack guard; GC in old space requested
File uploaded successfully

## 結果からわかること

1. **メモリ使用量の違い**:

   - `uploadWithStream.js` と `uploadWithRead.js` の両方で、メモリ使用量の変化（GCログ）が表示。
   - どちらのケースでも、最大で約10.6MBのメモリ使用量だが、`uploadWithRead.js` の方が `Mark-Compact` GC をトリガーしている。

2. **ストリームを使ったアップロードの利点**:

   - `uploadWithStream.js` の結果から、メモリ使用量が比較的安定していて、外部メモリプレッシャーが少ないことがわかる
   - ストリーミングがメモリ効率が高い方法であり、大きなファイルを扱う際にメモリ消費を抑えるのに役立つことを示す。

3. **全体のメモリ効率**:
   - 両者のメモリ使用量に大きな差は見られないが、`uploadWithRead.js` の方が頻繁にGCをトリガーしていることから、読み取り時の一時的なメモリ使用が多いことがわかる。
