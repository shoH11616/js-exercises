// if-elseを使用したバージョン
export function isHolidayIfElse(day) {
  if (day === "土" || day === "日") {
    return true;
  } else {
    return false;
  }
}

// switchを使用したバージョン
export function isHolidaySwitch(day) {
  switch (day) {
    case "土":
    case "日":
      return true;
    default:
      return false;
  }
}
