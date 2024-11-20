import { jest } from "@jest/globals";
import { createIssue, closeIssue, listOpenIssues } from "./githubIssues.js"; // 拡張子を明示

// `node-fetch`モジュールをモック化
jest.unstable_mockModule("node-fetch", () => ({
  default: jest.fn(),
}));

// モック化されたfetchをインポート
const fetch = (await import("node-fetch")).default;

describe("GitHub Issue Operations", () => {
  // 各テストの実行前にfetchのモックをクリア
  beforeEach(() => {
    fetch.mockClear();
  });

  // Issue作成のテスト
  it("should create an issue", async () => {
    // fetchの戻り値をモック
    fetch.mockResolvedValueOnce({
      json: async () => ({ html_url: "https://github.com/test/repo/issues/1" }),
    });

    // createIssue関数を呼び出し
    const result = await createIssue(
      "test/repo", // 対象リポジトリ
      "Test Issue", // Issueのタイトル
      "This is a test." // Issueの内容
    );

    // fetchが正しいURLとデータで呼び出されたかを検証
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/test/repo/issues",
      expect.objectContaining({
        method: "POST", // POSTメソッドであること
        headers: expect.any(Object), // ヘッダーが指定されていること
        body: JSON.stringify({ title: "Test Issue", body: "This is a test." }), // ボディが正しいJSONであること
      }),
    );

    // レスポンスのhtml_urlプロパティを検証
    expect(result.html_url).toBe("https://github.com/test/repo/issues/1");
  });

  // Issueクローズのテスト
  it("should close an issue", async () => {
    // fetchの戻り値をモック
    fetch.mockResolvedValueOnce({
      json: async () => ({ html_url: "https://github.com/test/repo/issues/1" }),
    });

    // closeIssue関数を呼び出し
    const result = await closeIssue("test/repo", 1); // Issue番号1をクローズ

    // fetchが正しいURLとデータで呼び出されたかを検証
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/test/repo/issues/1",
      expect.objectContaining({
        method: "PATCH", // PATCHメソッドであること
        headers: expect.any(Object), // ヘッダーが指定されていること
        body: JSON.stringify({ state: "closed" }), // ボディが正しいJSONであること
      }),
    );

    // レスポンスのhtml_urlプロパティを検証
    expect(result.html_url).toBe("https://github.com/test/repo/issues/1");
  });

  // オープンなIssue一覧取得のテスト
  it("should list open issues", async () => {
    // fetchの戻り値をモック
    fetch.mockResolvedValueOnce({
      json: async () => [{ number: 1, title: "Open Issue" }],
    });

    // listOpenIssues関数を呼び出し
    const issues = await listOpenIssues("test/repo");

    // fetchが正しいURLとデータで呼び出されたかを検証
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/test/repo/issues?state=open",
      expect.objectContaining({
        headers: expect.any(Object), // ヘッダーが指定されていること
      }),
    );

    // レスポンスのデータ構造を検証
    expect(issues).toEqual([{ number: 1, title: "Open Issue" }]);
  });
});
