import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      globals: globals.browser, // ブラウザのグローバル変数を使用
      ecmaVersion: 2021, // 最新のECMAScript仕様に対応
      sourceType: 'module', // モジュールとして解釈
    },
  },
  pluginJs.configs.recommended, // 推奨設定を適用
  prettier, // Prettierとの互換性を追加
  {
    files: ['./ex01/format_sample.js'], // 特定のファイルに適用
    rules: {
      'no-unused-vars': 'off', // 未使用変数を許容
    },
  },
];
