export function getAllProperties(obj) {
    let properties = [];
  
    // 独自のプロパティ（列挙不可、Symbolを含む）を取得
    let ownPropertyNames = Object.getOwnPropertyNames(obj);
    let ownSymbolProperties = Object.getOwnPropertySymbols(obj);
    properties = properties.concat(ownPropertyNames, ownSymbolProperties);
  
    // プロトタイプチェーンを辿り、列挙可能な継承プロパティを取得
    let prototype = Object.getPrototypeOf(obj);
    while (prototype !== null && prototype !== Object.prototype) {
      let prototypeProperties = Object.keys(prototype);
      properties = properties.concat(prototypeProperties);
      prototype = Object.getPrototypeOf(prototype);
    }
  
    return properties;
  }
  