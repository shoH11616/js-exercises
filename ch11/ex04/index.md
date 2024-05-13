予想：Float64Arrayのほうがメモリを効率的に動作できるため、typedArrayMultiplyのほうが高速に動く。

結果：arrayMultiply: 975.0116000175476, typedArrayMultiply: 986.5360000133514

結果の理由（予測）：行列の乗算はCPU密集型の処理であり、JavaScriptエンジンの最適化により、通常の配列と型付き配列のパフォーマンスに大きな差が出ない？
