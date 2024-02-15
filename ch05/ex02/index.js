// if文のバージョン
export function escapeWithIfElse(str) {
  let result = "";
  for (let char of str) {
    // null文字が含まれている場合
    if (char === "\u0000") {
      result += "\\0";
      // バックスペースが含まれている場合
    } else if (char === "\u0008") {
      result += "\\b";
      // 水平タブが含まれている場合
    } else if (char === "\u0009") {
      result += "\\t";
      // 改行が含まれている場合
    } else if (char === "\u000A") {
      result += "\\n";
      // 垂直タブが含まれている場合
    } else if (char === "\u000B") {
      result += "\\v";
      // 改頁が含まれている場合
    } else if (char === "\u000C") {
      result += "\\f";
      // 復帰が含まれている場合
    } else if (char === "\u000D") {
      result += "\\r";
      // 二重引用符が含まれている場合
    } else if (char === "\u0022") {
      result += '\\"';
      // アポストロフィまたは単一引用符が含まれている場合
    } else if (char === "\u0027") {
      result += "\\'";
      // バックスラッシュが含まれている場合
    } else if (char === "\u005C") {
      result += "\\" + "\u005C";
      // エスケープシーケンスの必要がない文字の場合
    } else {
      result += char;
    }
  }
  return result;
}

// switchを使用したバージョン
export function escapeWithSwitch(str) {
  let result = "";
  for (let char of str) {
    switch (char) {
      // null文字が含まれている場合
      case "\u0000":
        result += "\\0";
        break;
      // バックスペースが含まれている場合
      case "\u0008":
        result += "\\b";
        break;
      // 水平タブが含まれている場合
      case "\u0009":
        result += "\\t";
        break;
      // 改行が含まれている場合
      case "\u000A":
        result += "\\n";
        break;
      // 垂直タブが含まれている場合
      case "\u000B":
        result += "\\v";
        break;
      // 改頁が含まれている場合
      case "\u000C":
        result += "\\f";
        break;
      // 復帰が含まれている場合
      case "\u000D":
        result += "\\r";
        break;
      // 二重引用符が含まれている場合
      case "\u0022":
        result += '\\"';
        break;
      // アポストロフィまたは単一引用符が含まれている場合
      case "\u0027":
        result += "\\'";
        break;
      // バックスラッシュが含まれている場合
      case "\u005C":
        result += "\\" + "\u005C";
        break;
      // エスケープシーケンスの必要がない文字の場合
      default:
        result += char;
    }
  }
  return result;
}
