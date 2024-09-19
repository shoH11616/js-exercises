````markdown
# localStorage と sessionStorage のデータ有効期限の違い

## localStorage の動作確認

1. ブラウザのコンソールで以下のコードを実行し、`localStorage`にデータを保存。
   ```javascript
   localStorage.setItem("testKey", "testValue");
   console.log("localStorage:", localStorage.getItem("testKey"));
   ```
````

- 出力結果: `localStorage: testValue`

2. ブラウザを閉じて再度開き、コンソールで以下のコードを実行してデータが保持されているか確認。
   ```javascript
   console.log(
     "localStorage after reopening:",
     localStorage.getItem("testKey")
   );
   ```
   - 出力結果: `localStorage after reopening: testValue`

## sessionStorage の動作確認

1. ブラウザのコンソールで以下のコードを実行し、`sessionStorage`にデータを保存。

   ```javascript
   sessionStorage.setItem("testKey", "testValue");
   console.log("sessionStorage:", sessionStorage.getItem("testKey"));
   ```

   - 出力結果: `sessionStorage: testValue`

2. ブラウザを閉じて再度開き、コンソールで以下のコードを実行してデータが保持されているか確認。
   ```javascript
   console.log(
     "sessionStorage after reopening:",
     sessionStorage.getItem("testKey")
   );
   ```
   - 出力結果: `sessionStorage after reopening: null`

## 結論

- **localStorage**: データはブラウザを閉じても保持される。
- **sessionStorage**: データはブラウザのセッションが終了するとクリアされる。

```

```
