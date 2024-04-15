/**
 * クラス C は、静的メソッド、インスタンスメソッド、
 * そして静的およびインスタンスメソッドを持つ内部クラスを提供します。
 */
export class C {
  /**
   * 静的メソッドは 1 を返します。
   * @returns {number} 1
   */
  static method() {
    return 1;
  }

  /**
   * インスタンスメソッドは 2 を返します。
   * @returns {number} 2
   */
  method() {
    return 2;
  }

  /**
   * 内部クラス C は、静的メソッドとインスタンスメソッドを提供します。
   */
  static C = class {
    /**
     * 静的メソッドは 3 を返します。
     * @returns {number} 3
     */
    static method() {
      return 3;
    }

    /**
     * インスタンスメソッドは 4 を返します。
     * @returns {number} 4
     */
    method() {
      return 4;
    }
  };

  /**
   * インスタンスメソッド C は、新しい内部クラスを返します。
   * この内部クラスは、5 を返すメソッドと、6 を返すメソッドを提供するクラスを返します。
   * @returns {class} 内部クラス
   */
  get C() {
    return class {
      /**
       * このメソッドは 5 を返します。
       * @returns {number} 5
       */
      method() {
        return 5;
      }

      /**
       * このメソッドは新しいクラスを返します。
       * このクラスは、6 を返すメソッドを提供します。
       * @returns {class} 新しいクラス
       */
      get C() {
        return class {
          /**
           * このメソッドは 6 を返します。
           * @returns {number} 6
           */
          method() {
            return 6;
          }
        };
      }
    };
  }
}
