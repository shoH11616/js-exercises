import { Polly } from "@pollyjs/core";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";

import { createIssue, closeIssue, listOpenIssues } from "./githubIssues";

// Pollyのアダプタとパーシスターを登録
Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe("GitHub Issue Operations with Polly.JS", () => {
  let polly;

  // テストスイートの開始時にPollyを初期化
  beforeAll(() => {
    polly = new Polly("GitHub API Tests", {
      adapters: ["node-http"], // Node.js用HTTPアダプタを使用
      persister: "fs", // ファイルシステムパーシスターを使用
    });

    // Pollyの設定を構成
    polly.configure({
      recordIfMissing: true, // リクエストの記録が存在しない場合、新しく記録を作成
      matchRequestsBy: {
        headers: false, // ヘッダーによるリクエストの一致を無効化
      },
    });
  });

  // テストスイートの終了時にPollyを停止
  afterAll(async () => {
    await polly.stop(); // Pollyの停止とリソースの解放
  });

  // Issue作成のテスト
  it("should create an issue", async () => {
    const result = await createIssue(
      "test/repo", // 対象のリポジトリ
      "Test Issue", // Issueのタイトル
      "This is a test." // Issueの内容
    );
    // 作成されたIssueにhtml_urlプロパティが含まれることを確認
    expect(result).toHaveProperty("html_url");
  });

  // Issueクローズのテスト
  it("should close an issue", async () => {
    const result = await closeIssue("test/repo", 1); // Issue番号1をクローズ
    // クローズされたIssueにhtml_urlプロパティが含まれることを確認
    expect(result).toHaveProperty("html_url");
  });

  // オープンなIssue一覧取得のテスト
  it("should list open issues", async () => {
    const issues = await listOpenIssues("test/repo"); // 対象リポジトリのオープンなIssueを取得
    // 取得結果が配列であることを確認
    expect(Array.isArray(issues)).toBe(true);
  });
});
