// if-else
export function escapeWithIfElse(str) {
  let result = "";
  for (let char of str) {
    if (char === "0") {
      result += "\0";
    } else if (char === "b") {
      result += "\b";
    } else if (char === "t") {
      result += "\t";
    } else if (char === "n") {
      result += "\n";
    } else if (char === "v") {
      result += "\v";
    } else if (char === "f") {
      result += "\f";
    } else if (char === "r") {
      result += "\r";
    } else if (char === '"') {
      // eslint-disable-next-line no-useless-escape
      result += '"';
    } else if (char === "'") {
      result += "'";
    } else if (char === "\u005c") {
      result += "\\";
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
      case "0":
        result += "\0";
        break;
      case "b":
        result += "\b";
        break;
      case "t":
        result += "\t";
        break;
      case "n":
        result += "\n";
        break;
      case "v":
        result += "\v";
        break;
      case "f":
        result += "\f";
        break;
      case "r":
        result += "\r";
        break;
      case '"':
        // eslint-disable-next-line no-useless-escape
        result += '"';
        break;
      case "'":
        result += "'";
        break;
      case "\u005c":
        result += "\\";
        break;
      default:
        result += char;
    }
  }
  return result;
}
