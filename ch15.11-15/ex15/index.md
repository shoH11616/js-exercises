# 機密情報をヘッダーで指定する理由

## 1. URLの可視性

- パスやクエリパラメータはURLに含まれるため、ブラウザのアドレスバーやサーバーログに記録されやすい
- URLはブックマークや共有されることが多く、機密情報が漏洩するリスクが高まる

## 2. キャッシュの問題

- ブラウザやプロキシサーバーはURLをキャッシュすることがある
- パスやクエリパラメータに機密情報が含まれていると、キャッシュに保存されることで情報漏洩のリスクが増加する

## 3. ログの問題

- サーバーやネットワーク機器のログには、リクエストされたURLが記録されることが多い
- パスやクエリパラメータに機密情報が含まれていると、ログに機密情報が残ることになり、セキュリティリスクが高まる

## 4. セキュリティヘッダーの利用

- HTTPヘッダーは、機密情報を安全に送信するための専用のフィールドを提供する
- 例えば、`Authorization`ヘッダーは認証情報を安全に送信するために使用される

## 5. 一貫性と標準化

- APIの設計において、機密情報をヘッダーで指定することは一般的なベストプラクティスとされている
- これにより、セキュリティの一貫性が保たれ、開発者がセキュリティリスクを管理しやすくなる
