// Object.assign()と等価な関数assign()の定義
export function assign(target, ...sources) {
    sources.forEach(source => {
      Reflect.ownKeys(source).forEach(key => {
        Reflect.set(target, key, source[key]);
      });
    });
    return target;
  }