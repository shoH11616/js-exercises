import fetch from "node-fetch";

/**
 * GitHubのリポジトリにIssueを作成する関数
 */
export async function createIssue(repo, title, body) {
  const url = `https://api.github.com/repos/${repo}/issues`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });
  const data = await response.json();
  return data; // 実行結果を返す
}

/**
 * GitHubのリポジトリのIssueをクローズする関数
 */
export async function closeIssue(repo, issue_number) {
  const url = `https://api.github.com/repos/${repo}/issues/${issue_number}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ state: "closed" }),
  });
  const data = await response.json();
  return data; // 実行結果を返す
}

/**
 * GitHubのリポジトリのオープンなIssueの一覧を表示する関数
 */
export async function listOpenIssues(repo) {
  const url = `https://api.github.com/repos/${repo}/issues?state=open`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const issues = await response.json();
  return issues; // Issue一覧を返す
}
