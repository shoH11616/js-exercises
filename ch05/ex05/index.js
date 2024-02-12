export function filterEvenProperties(obj) {
    let result = {};
    for (let key in obj) {
      if (obj[key] % 2 === 0) {
        result[key] = obj[key];
      }
    }
    return result;
  }
  