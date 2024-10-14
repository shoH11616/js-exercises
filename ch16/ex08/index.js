#!/usr/bin/env node

import fetch from "node-fetch";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";

/**
 * GitHubのリポジトリにIssueを作成する関数
 *
 * @param {string} repo - リポジトリ名（形式: owner/repo）
 * @param {string} title - Issueのタイトル
 * @param {string} body - Issueの本文
 * @returns {Promise<void>}
 */
async function createIssue(repo, title, body) {
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
  console.log(`Created issue: ${data.html_url}`);
}

/**
 * GitHubのリポジトリのIssueをクローズする関数
 *
 * @param {string} repo - リポジトリ名（形式: owner/repo）
 * @param {number} issue_number - クローズするIssueの番号
 * @returns {Promise<void>}
 */
async function closeIssue(repo, issue_number) {
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
  console.log(`Closed issue: ${data.html_url}`);
}

/**
 * GitHubのリポジトリのオープンなIssueの一覧を表示する関数
 *
 * @param {string} repo - リポジトリ名（形式: owner/repo）
 * @returns {Promise<void>}
 */
async function listOpenIssues(repo) {
  const url = `https://api.github.com/repos/${repo}/issues?state=open`;
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const issues = await response.json();
  issues.forEach((issue) => {
    console.log(`#${issue.number}: ${issue.title}`);
  });
}

/**
 * コマンドライン引数を解析して実行するメイン関数
 *
 * @returns {void}
 */
function main() {
  const argv = yargs(hideBin(process.argv))
    .command(
      "create <repo> <title> [body]",
      "Create a new issue",
      (yargs) => {
        yargs
          .positional("repo", {
            describe: "Repository in the format owner/repo",
            type: "string",
          })
          .positional("title", {
            describe: "Title of the issue",
            type: "string",
          })
          .positional("body", {
            describe: "Body of the issue",
            type: "string",
            default: "",
          });
      },
      (argv) => {
        createIssue(argv.repo, argv.title, argv.body);
      }
    )
    .command(
      "close <repo> <issue_number>",
      "Close an issue",
      (yargs) => {
        yargs
          .positional("repo", {
            describe: "Repository in the format owner/repo",
            type: "string",
          })
          .positional("issue_number", {
            describe: "Number of the issue to close",
            type: "number",
          });
      },
      (argv) => {
        closeIssue(argv.repo, argv.issue_number);
      }
    )
    .command(
      "list <repo>",
      "List open issues",
      (yargs) => {
        yargs.positional("repo", {
          describe: "Repository in the format owner/repo",
          type: "string",
        });
      },
      (argv) => {
        listOpenIssues(argv.repo);
      }
    )
    .option("h", {
      alias: "help",
      description: "Display help message",
      type: "boolean",
    })
    .option("v", {
      alias: "verbose",
      description: "Enable verbose logging",
      type: "boolean",
    })
    .middleware((argv) => {
      if (argv.verbose) {
        console.log("Verbose logging enabled");
        const originalFetch = fetch;
        fetch = async (...args) => {
          console.log("HTTP request:", args);
          return originalFetch(...args);
        };
      }
    })
    .help().argv;
}

main();
