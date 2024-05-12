1. AMD (Asynchronous Module Definition): AMDは非同期モジュール定義を提供します。これは、ブラウザ環境での非同期ロードに特化しています。RequireJSなどのライブラリがこの方式を採用しています。

2. UMD (Universal Module Definition): UMDは、AMDとCommonJSのような異なるモジュール形式を統一的に扱うことを目指しています。これにより、同じコードがサーバーサイド（Node.jsなど）とクライアントサイド（ブラウザなど）の両方で動作するようになります。

3. SystemJS: SystemJSは、ES Module、AMD、CommonJSなど、さまざまなモジュール形式をサポートする動的モジュールローダーです。これにより、異なるモジュール形式を混在させて使用することが可能になります。
