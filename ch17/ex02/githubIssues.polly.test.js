import { Polly } from "@pollyjs/core";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";

import { createIssue, closeIssue, listOpenIssues } from "./githubIssues";

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe("GitHub Issue Operations with Polly.JS", () => {
  let polly;

  beforeAll(() => {
    polly = new Polly("GitHub API Tests", {
      adapters: ["node-http"],
      persister: "fs",
    });
    polly.configure({
      recordIfMissing: true,
      matchRequestsBy: {
        headers: false,
      },
    });
  });

  afterAll(async () => {
    await polly.stop();
  });

  it("should create an issue", async () => {
    const result = await createIssue(
      "test/repo",
      "Test Issue",
      "This is a test.",
    );
    expect(result).toHaveProperty("html_url");
  });

  it("should close an issue", async () => {
    const result = await closeIssue("test/repo", 1);
    expect(result).toHaveProperty("html_url");
  });

  it("should list open issues", async () => {
    const issues = await listOpenIssues("test/repo");
    expect(Array.isArray(issues)).toBe(true);
  });
});
