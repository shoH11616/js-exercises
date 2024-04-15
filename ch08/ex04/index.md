1. nest.nm()を実行時
   nm()は通常の関数なので、thisは呼び出し元のオブジェクト（nest）を指す。
   したがってthis === obj はfalseとなり、this === nestはtrueになる。
2. nest.arrow()を実行時
   arrowはアロー関数なので、thisは定義されたスコープ(om関数のスコープ)のthisを継承する。
   したがってthis === obj はtrueとなり、this === nestはfalseになる。
