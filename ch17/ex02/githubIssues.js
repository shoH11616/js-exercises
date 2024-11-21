import fetch from 'node-fetch';

/**
 * GitHubのリポジトリにIssueを作成する関数
 *
 * @param {string} repo - リポジトリ名（形式: owner/repo）
 * @param {string} title - Issueのタイトル
 * @param {string} body - Issueの本文
 * @returns {Promise<Object>} 作成されたIssueのデータ
 */
export async function createIssue(repo, title, body) {
  const url = `https://api.github.com/repos/${repo}/issues`; // Issue作成のエンドポイント
  const response = await fetch(url, {
    method: 'POST', // POSTメソッドでリクエスト
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`, // トークンを使用して認証
      'Content-Type': 'application/json', // リクエストボディはJSON形式
    },
    body: JSON.stringify({ title, body }), // タイトルと本文をリクエストボディに含める
  });
  return response.json(); // 作成されたIssueのJSONデータを返す
}

/**
 * GitHubのリポジトリのIssueをクローズする関数
 *
 * @param {string} repo - リポジトリ名（形式: owner/repo）
 * @param {number} issue_number - クローズするIssueの番号
 * @returns {Promise<Object>} クローズされたIssueのデータ
 */
export async function closeIssue(repo, issue_number) {
  const url = `https://api.github.com/repos/${repo}/issues/${issue_number}`; // Issueクローズのエンドポイント
  const response = await fetch(url, {
    method: 'PATCH', // PATCHメソッドでリクエスト
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`, // トークンを使用して認証
      'Content-Type': 'application/json', // リクエストボディはJSON形式
    },
    body: JSON.stringify({ state: 'closed' }), // Issueをクローズするための状態設定
  });
  return response.json(); // クローズされたIssueのJSONデータを返す
}

/**
 * GitHubのリポジトリのオープンなIssueの一覧を取得する関数
 *
 * @param {string} repo - リポジトリ名（形式: owner/repo）
 * @returns {Promise<Array>} オープンなIssueのリスト
 */
export async function listOpenIssues(repo) {
  const url = `https://api.github.com/repos/${repo}/issues?state=open`; // オープンなIssueを取得するエンドポイント
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`, // トークンを使用して認証
      'Content-Type': 'application/json', // リクエストヘッダーをJSON形式に設定
    },
  });
  return response.json(); // オープンなIssueのリストをJSONデータで返す
}
