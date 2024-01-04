// 未回答、テストを満たすものを考えられなかった

export function substring(str, indexStart, indexEnd) {
  // TODO: ここを実装しなさい
    // 引数がNaNの場合は空文字列を返す
    // if (isNaN(indexStart) || isNaN(indexEnd)) {
    //   return '';
    // }
  
    // indexEnd が未定義の場合は文字列の最後までとする
    if (indexEnd === undefined) {
      indexEnd = str.length;
    }
  
    // indexEnd が負の値の場合、文字列の最後からの相対位置とする
    if (indexEnd < 0) {
      indexEnd = str.length + indexEnd;
    }
  
    // indexStart が負の値の場合、文字列の最後からの相対位置とする
    if (indexStart < 0) {
      indexStart = str.length + indexStart;
    }
  
    // indexStart が indexEnd より大きい場合、引数を入れ替える
    if (indexStart > indexEnd) {
      [indexStart, indexEnd] = [indexEnd, indexStart];
    }
  
    // 文字列から部分文字列を切り取って返す
    return str.slice(indexStart, indexEnd);
}

export function slice(str, indexStart, indexEnd) {
  // TODO: ここを実装しなさい
  return "TODO";
}

export function padStart(str, targetLength, padString) {
  // TODO: ここを実装しなさい
  return "TODO";
}

export function trim(str) {
  // TODO: ここを実装しなさい
  return "TODO";
}
