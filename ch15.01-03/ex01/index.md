type="module"属性を削除すると、スクリプトは通常のスクリプトとして扱われ、モジュールスコープではなくグローバルスコープで実行される。これにより、importやexportといったES6モジュールの機能が使えなくなる。defer属性が設定も外れる。
type="module"を削除した場合、以下のようにDOMContentLoadedイベントリスナーを使用して、HTMLドキュメントが完全に読み込まれてからスクリプトが実行されるようにして、スクリプトが実行される時点で必要なDOM要素が確実に存在することが保証する必要がある。

```javascript
window.addEventListener('DOMContentLoaded', (event) => {
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
// 以下略
```
