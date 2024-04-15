/**
 * 食べる振る舞いを持つクラス
 */
class Eater {
  eat() {
    // ...
  }
}

/**
 * 鳴く振る舞いを持つクラス
 */
class SoundMaker {
  makeSound() {
    // ...
  }
}

/**
 * 犬クラス。食べる振る舞いと鳴く振る舞いを持つ。
 */
class Dog {
  constructor() {
    this.eater = new Eater();
    this.soundMaker = new SoundMaker();
  }

  eat() {
    this.eater.eat();
  }

  makeSound() {
    this.soundMaker.makeSound();
  }

  bite() {
    // ...
  }
}

/**
 * 猫クラス。食べる振る舞いと鳴く振る舞いを持つ。
 */
class Cat {
  constructor() {
    this.eater = new Eater();
    this.soundMaker = new SoundMaker();
  }

  eat() {
    this.eater.eat();
  }

  makeSound() {
    this.soundMaker.makeSound();
  }

  scratch() {
    // ...
  }
}

/**
 * 鳥クラス。飛ぶ振る舞いと鳴く振る舞いを持つ。
 */
class Bird {
  constructor() {
    this.eater = new Eater();
    this.soundMaker = new SoundMaker();
  }

  eat() {
    this.eater.eat();
  }

  makeSound() {
    this.soundMaker.makeSound();
  }

  fly() {
    // ...
  }
}

/**
 * 魚クラス。泳ぐ振る舞いを持つ。
 */
class Fish {
  constructor() {
    this.eater = new Eater();
  }

  eat() {
    this.eater.eat();
  }

  swim() {
    // ...
  }
}
