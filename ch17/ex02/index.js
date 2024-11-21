#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createIssue, closeIssue, listOpenIssues } from './githubIssues.js';

/**
 * メイン関数
 * コマンドライン引数を解析して対応するGitHub操作を実行
 */
function main() {
  const argv = yargs(hideBin(process.argv))
    // createコマンド: 新しいIssueを作成
    .command(
      'create <repo> <title> [body]',
      'Create a new issue',
      (yargs) => {
        yargs
          .positional('repo', {
            describe: 'Repository in the format owner/repo', // リポジトリ形式
            type: 'string',
          })
          .positional('title', {
            describe: 'Title of the issue', // Issueのタイトル
            type: 'string',
          })
          .positional('body', {
            describe: 'Body of the issue', // Issueの本文
            type: 'string',
            default: '', // 本文はオプション
          });
      },
      async (argv) => {
        const data = await createIssue(argv.repo, argv.title, argv.body); // Issueを作成
        console.log(`Created issue: ${data.html_url}`); // 作成されたIssueのURLを出力
      },
    )
    // closeコマンド: 指定したIssueをクローズ
    .command(
      'close <repo> <issue_number>',
      'Close an issue',
      (yargs) => {
        yargs
          .positional('repo', {
            describe: 'Repository in the format owner/repo', // リポジトリ形式
            type: 'string',
          })
          .positional('issue_number', {
            describe: 'Number of the issue to close', // クローズするIssueの番号
            type: 'number',
          });
      },
      async (argv) => {
        const data = await closeIssue(argv.repo, argv.issue_number); // Issueをクローズ
        console.log(`Closed issue: ${data.html_url}`); // クローズされたIssueのURLを出力
      },
    )
    // listコマンド: オープンなIssueの一覧を表示
    .command(
      'list <repo>',
      'List open issues',
      (yargs) => {
        yargs.positional('repo', {
          describe: 'Repository in the format owner/repo', // リポジトリ形式
          type: 'string',
        });
      },
      async (argv) => {
        const issues = await listOpenIssues(argv.repo); // オープンなIssueを取得
        if (issues.length === 0) {
          console.log('No open issues found.');
        } else {
          issues.forEach((issue) => {
            console.log(`#${issue.number}: ${issue.title}`); // Issue番号とタイトルを表示
          });
        }
      },
    )
    // ヘルプオプションを有効化
    .help().argv;
}

// メイン関数を実行
main();
