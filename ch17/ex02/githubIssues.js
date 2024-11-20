import fetch from "node-fetch";

/**
 * GitHubリポジトリに新しいIssueを作成する関数
 * @param {string} repo - 対象のリポジトリ名（例: "owner/repository"）
 * @param {string} title - 作成するIssueのタイトル
 * @param {string} body - 作成するIssueの内容（説明など）
 * @returns {Promise<Object>} 作成したIssueの情報を含むオブジェクト
 */
export async function createIssue(repo, title, body) {
  // Issue作成用のGitHub APIエンドポイントURL
  const url = `https://api.github.com/repos/${repo}/issues`;
  
  // APIリクエストを送信
  const response = await fetch(url, {
    method: "POST", // HTTPメソッドはPOSTを指定
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`, // トークンを使用して認証
      "Content-Type": "application/json", // リクエストボディはJSON形式
    },
    body: JSON.stringify({ title, body }), // リクエストの中身（タイトルと内容）
  });

  // レスポンスのJSONデータを取得
  const data = await response.json();
  return data; // 作成したIssueの情報を返す
}

/**
 * GitHubリポジトリの特定のIssueをクローズする関数
 * @param {string} repo - 対象のリポジトリ名（例: "owner/repository"）
 * @param {number} issue_number - クローズするIssueの番号
 * @returns {Promise<Object>} クローズされたIssueの情報を含むオブジェクト
 */
export async function closeIssue(repo, issue_number) {
  // Issueクローズ用のGitHub APIエンドポイントURL
  const url = `https://api.github.com/repos/${repo}/issues/${issue_number}`;
  
  // APIリクエストを送信
  const response = await fetch(url, {
    method: "PATCH", // HTTPメソッドはPATCHを指定
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`, // トークンを使用して認証
      "Content-Type": "application/json", // リクエストボディはJSON形式
    },
    body: JSON.stringify({ state: "closed" }), // Issueをクローズするためのデータ
  });

  // レスポンスのJSONデータを取得
  const data = await response.json();
  return data; // クローズされたIssueの情報を返す
}

/**
 * GitHubリポジトリのオープンなIssue一覧を取得する関数
 * @param {string} repo - 対象のリポジトリ名（例: "owner/repository"）
 * @returns {Promise<Object[]>} オープンなIssueの情報を含む配列
 */
export async function listOpenIssues(repo) {
  // オープンなIssueを取得するためのGitHub APIエンドポイントURL
  const url = `https://api.github.com/repos/${repo}/issues?state=open`;

  // APIリクエストを送信
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`, // トークンを使用して認証
      "Content-Type": "application/json", // リクエストヘッダーはJSON形式
    },
  });

  // レスポンスのJSONデータを取得
  const issues = await response.json();
  return issues; // オープンなIssue一覧を返す
}
