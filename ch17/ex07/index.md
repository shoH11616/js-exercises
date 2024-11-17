# `@babel/preset-typescript` と `tsc` の違い

## **1. 概要**

- **`@babel/preset-typescript`**

  - BabelのプラグインでTypeScriptコードをJavaScriptにトランスパイルする。
  - 型情報を無視して、構文のみをトランスパイル。

- **`tsc`**
  - TypeScript公式コンパイラ（TypeScript Compiler）。
  - 型チェックとトランスパイルを行う。

---

## **2. 主な違い**

| **項目**                 | **@babel/preset-typescript**                   | **tsc**                          |
| ------------------------ | ---------------------------------------------- | -------------------------------- |
| **型チェック**           | 行わない                                       | 行う                             |
| **トランスパイル速度**   | 高速                                           | 遅い（型チェックを行うため）     |
| **対応する設定ファイル** | `.babelrc` または `babel.config.js`            | `tsconfig.json`                  |
| **拡張性**               | Babelエコシステムと連携可能（プラグイン多数）  | TypeScript専用                   |
| **サポート範囲**         | TypeScriptの一部（型チェックや型エラーは無視） | TypeScript全機能を完全にサポート |

---
