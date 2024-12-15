// pass

import { createIssue, closeIssue, listOpenIssues } from "./githubIssues";
import fetch from "node-fetch";

// `node-fetch`をモック化
jest.mock("node-fetch", () => jest.fn());

describe("GitHub Issues Library", () => {
  // 各テストの前にモックをクリア
  beforeEach(() => {
    fetch.mockClear();
  });

  // createIssue関数が新しいIssueを正しく作成することをテスト
  it("should create an issue", async () => {
    const mockResponse = { html_url: "https://github.com/test/repo/issues/1" };
    fetch.mockResolvedValueOnce({
      json: async () => mockResponse, // モックされたレスポンス
    });

    const data = await createIssue(
      "test/repo", // リポジトリ
      "Test Issue", // タイトル
      "This is a test issue" // 本文
    );

    // fetchが正しい引数で呼び出されたかを検証
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/test/repo/issues",
      expect.objectContaining({
        method: "POST", // メソッドがPOSTであること
      })
    );

    // レスポンスが期待値通りであることを検証
    expect(data).toEqual(mockResponse);
  });

  // closeIssue関数が指定したIssueを正しくクローズすることをテスト
  it("should close an issue", async () => {
    const mockResponse = { html_url: "https://github.com/test/repo/issues/1" };
    fetch.mockResolvedValueOnce({
      json: async () => mockResponse, // モックされたレスポンス
    });

    const data = await closeIssue("test/repo", 1); // Issue番号1をクローズ

    // fetchが正しい引数で呼び出されたかを検証
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/test/repo/issues/1",
      expect.objectContaining({
        method: "PATCH", // メソッドがPATCHであること
      })
    );

    // レスポンスが期待値通りであることを検証
    expect(data).toEqual(mockResponse);
  });

  // listOpenIssues関数がオープンなIssueを正しく取得することをテスト
  it("should list open issues", async () => {
    const mockResponse = [{ number: 1, title: "Test Issue" }];
    fetch.mockResolvedValueOnce({
      json: async () => mockResponse, // モックされたレスポンス
    });

    const data = await listOpenIssues("test/repo"); // オープンなIssueを取得

    // fetchが正しい引数で呼び出されたかを検証
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/test/repo/issues?state=open",
      expect.objectContaining({
        headers: expect.any(Object), // ヘッダーが指定されていること
      })
    );

    // レスポンスが期待値通りであることを検証
    expect(data).toEqual(mockResponse);
  });
});
