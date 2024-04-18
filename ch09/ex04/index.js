/**
 * 戦士クラス。攻撃力atkフィールドと攻撃attackメソッドを持つ。
 */
export class Warrior1 {
  constructor(atk) {
    this.atk = atk;
  }

  /**
   * 攻撃メソッド。atkの2倍の値をダメージとして返す。
   * @returns {number} ダメージ値
   */
  attack() {
    return this.atk * 2;
  }
}

/**
 * 魔法戦士クラス。戦士を継承し、魔力mgcフィールドを持つ。
 */
export class MagicWarrior1 extends Warrior1 {
  constructor(atk, mgc) {
    super(atk);
    this.mgc = mgc;
  }

  /**
   * 攻撃メソッド。戦士のattackの値にmgcの値を加算した値をダメージとして返す。
   * @returns {number} ダメージ値
   */
  attack() {
    return super.attack() + this.mgc;
  }
}

/**
 * 戦士コンストラクタ関数。攻撃力atkフィールドと攻撃attackメソッドを持つ。
 */
export function Warrior2(atk) {
  this.atk = atk;
}

/**
 * Warrior2のプロトタイプに攻撃メソッドattackを追加。atkの2倍の値をダメージとして返す。
 * @returns {number} ダメージ値
 */
Warrior2.prototype.attack = function () {
  return this.atk * 2;
};

/**
 * 魔法戦士コンストラクタ。戦士を継承し、魔力mgcフィールドを持つ。
 */
export function MagicWarrior2(atk, mgc) {
  Warrior2.call(this, atk);
  this.mgc = mgc;
}

// 戦士のプロトタイプを継承
MagicWarrior2.prototype = Object.create(Warrior2.prototype);

/**
 * MagicWarrior2のprototypeに攻撃メソッドを追加。戦士のattackの値にmgcの値を加算した値をダメージとして返す。
 * @returns {number} ダメージ値
 */
MagicWarrior2.prototype.attack = function () {
  return Warrior2.prototype.attack.call(this) + this.mgc;
};
