import { retryWithExponentialBackoff } from "./index.js";

describe("retryWithExponentialBackoff", () => {
  it("resolves when func resolves", async () => {
    const func = jest.fn().mockResolvedValue("resolved");
    const result = await retryWithExponentialBackoff(func, 5);
    expect(result).toBe("resolved");
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("retries up to maxRetry times when func rejects", async () => {
    const func = jest.fn().mockRejectedValue(new Error("rejected"));
    await expect(retryWithExponentialBackoff(func, 5)).rejects.toThrow(
      "rejected"
    );
    expect(func).toHaveBeenCalledTimes(6);
  });

  it("stops retrying when func resolves after a rejection", async () => {
    const func = jest
      .fn()
      .mockRejectedValueOnce(new Error("rejected"))
      .mockResolvedValueOnce("resolved");
    const result = await retryWithExponentialBackoff(func, 5);
    expect(result).toBe("resolved");
    expect(func).toHaveBeenCalledTimes(2);
  });
});
