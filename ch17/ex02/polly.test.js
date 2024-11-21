// テストが通らなかった

import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';
import FSPersister from '@pollyjs/persister-fs';
import { createIssue, closeIssue, listOpenIssues } from './githubIssues';

// PollyJSのアダプターとパーシスターを登録
Polly.register(FetchAdapter);
Polly.register(FSPersister);

describe('PollyJS Tests', () => {
  let polly;

  beforeAll(() => {
    // Pollyインスタンスを初期化
    polly = new Polly('GitHub API', {
      adapters: ['fetch'], // fetchアダプターを使用
      persister: 'fs', // ファイルシステムにリクエストデータを保存
      matchRequestsBy: {
        url: true, // リクエストのURLで一致判定
      },
    });

    // Pollyの設定を構成
    polly.configure({
      recordIfMissing: true, // 記録がない場合、新しく記録を作成
      matchRequestsBy: {
        method: true, // HTTPメソッドも一致判定に含める
        headers: false, // ヘッダーは一致判定に含めない
      },
    });
  });

  afterAll(async () => {
    // Pollyを停止
    await polly.stop();
  });

  // Issueを作成する機能のテスト
  it('should create an issue', async () => {
    const data = await createIssue(
      'test/repo',
      'Test Issue',
      'This is a test issue',
    );

    // レスポンスがhtml_urlプロパティを持っていることを検証
    expect(data).toHaveProperty('html_url');
  });

  // Issueをクローズする機能のテスト
  it('should close an issue', async () => {
    const data = await closeIssue('test/repo', 1);

    // レスポンスがhtml_urlプロパティを持っていることを検証
    expect(data).toHaveProperty('html_url');
  });

  // オープンなIssueを一覧表示する機能のテスト
  it('should list open issues', async () => {
    const data = await listOpenIssues('test/repo');

    // レスポンスが配列であることを検証
    expect(Array.isArray(data)).toBe(true);
  });
});
