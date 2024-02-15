// 未完成, 最終的なビット計算で+演算子を使わない方法がわからなかった

export function sub(x, y) {
    // y の 2 の補数を計算
    // ビット否定演算子でyのビットを反転させ、その結果に1を加えることでyの2の補数を計算し、変数に代入
    let twoComp = (~y) + 1;

    // +使うやり方
    // x = x + twoComp 

    // +未使用
    // x と twoComp のビット単位での加算
    // twoCompが0になるまでビット単位での加算を続ける
    // while (twoComp !== 0) {
      
    // }
  
    return x;
  }