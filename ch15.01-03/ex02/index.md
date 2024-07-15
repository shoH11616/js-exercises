1. **ローカルサーバーのセットアップ**:
   動的インポートは、ファイルがHTTPまたはHTTPS経由で提供される場合にのみ動作するので、ローカルサーバーをセットアップする必要がある。
   ターミナルで以下のコマンドを実行してhttp-serverをインストール。

```bash
npm install --global http-server
```

2. **スクリプトの作成**:
   動的にインポートするスクリプトを作成。今回は`dynamic-module.js`という名前のファイルを作成し、以下のようなコードを追加。

```javascript
export function hello() {
  console.log("Hello from dynamic module!");
}
```

3. **動的インポートの実行**:
   HTMLファイル内で動的インポートを実行。

```html
<!doctype html>
<html>
  <body>
    <script type="module">
      async function loadModule() {
        const module = await import("./dynamic-module.js");
        module.hello();
      }
      loadModule();
    </script>
  </body>
</html>
```

4. **ローカルサーバーの起動**:
   ターミナル（powershellだとポリシーの関係で無理なのでcmd）で以下のコマンドを実行してローカルサーバーを起動。

```bash
http-server . -p 8000
```

5. **ブラウザでの確認**:
   ブラウザを開き、`http://localhost:8000`にアクセス。
   開発者ツールのコンソールを開くと、`Hello from dynamic module!`というメッセージが表示される。
