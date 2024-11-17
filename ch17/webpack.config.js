const path = require("path");

module.exports = {
  entry: "./ex06/index.js", // エントリポイント
  output: {
    filename: "bundle.js", // バンドル後の出力ファイル
    path: path.resolve(__dirname, "ex06/dist"), // 出力先ディレクトリ
  },
  mode: "development", // 開発モード
  devtool: "source-map", // ソースマップを生成
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Babelを使いたい場合
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
