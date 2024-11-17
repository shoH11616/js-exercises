import { jest } from "@jest/globals";
import { createIssue, closeIssue, listOpenIssues } from "./githubIssues.js"; // 拡張子を明示

jest.unstable_mockModule("node-fetch", () => ({
  default: jest.fn(),
}));

const fetch = (await import("node-fetch")).default;

describe("GitHub Issue Operations", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should create an issue", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ html_url: "https://github.com/test/repo/issues/1" }),
    });

    const result = await createIssue(
      "test/repo",
      "Test Issue",
      "This is a test.",
    );
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/test/repo/issues",
      expect.objectContaining({
        method: "POST",
        headers: expect.any(Object),
        body: JSON.stringify({ title: "Test Issue", body: "This is a test." }),
      }),
    );
    expect(result.html_url).toBe("https://github.com/test/repo/issues/1");
  });

  it("should close an issue", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ html_url: "https://github.com/test/repo/issues/1" }),
    });

    const result = await closeIssue("test/repo", 1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/test/repo/issues/1",
      expect.objectContaining({
        method: "PATCH",
        headers: expect.any(Object),
        body: JSON.stringify({ state: "closed" }),
      }),
    );
    expect(result.html_url).toBe("https://github.com/test/repo/issues/1");
  });

  it("should list open issues", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [{ number: 1, title: "Open Issue" }],
    });

    const issues = await listOpenIssues("test/repo");
    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/repos/test/repo/issues?state=open",
      expect.objectContaining({
        headers: expect.any(Object),
      }),
    );
    expect(issues).toEqual([{ number: 1, title: "Open Issue" }]);
  });
});
