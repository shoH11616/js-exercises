// 以下のエラーを解決できなかった
// retryWithExponentialBackoff
// √ returns immediately if func returns true (2 ms)
// √ retries up to maxRetry times if func returns false (1 ms)
// √ stops retrying once func returns true (1 ms)
// × waits exponentially longer between each retry (1 ms)

// ● retryWithExponentialBackoff › waits exponentially longer between each retry

// expect(jest.fn()).toHaveBeenCalledTimes(expected)

// Expected number of calls: 2
// Received number of calls: 1

//   58 |
//   59 |     jest.advanceTimersByTime(1000);
// > 60 |     expect(func).toHaveBeenCalledTimes(2);
//      |                  ^
//   61 |
//   62 |     jest.advanceTimersByTime(2000);
//   63 |     expect(func).toHaveBeenCalledTimes(3);

//   at Object.toHaveBeenCalledTimes (ch11/ex16/index.test.js:60:18)

// Test Suites: 1 failed, 1 total
// Tests:       1 failed, 3 passed, 4 total
// Snapshots:   0 total
// Time:        0.233 s, estimated 1 s

import { describe, it, expect, jest } from "@jest/globals";
import { retryWithExponentialBackoff } from "./index.js";

describe("retryWithExponentialBackoff", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("returns immediately if func returns true", () => {
    const func = jest.fn().mockReturnValue(true);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
  });

  it("retries up to maxRetry times if func returns false", () => {
    const func = jest.fn().mockReturnValue(false);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    jest.runAllTimers();

    expect(func).toHaveBeenCalledTimes(4);
    expect(callback).toHaveBeenCalledWith(false);
  });

  it("stops retrying once func returns true", () => {
    const func = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    jest.runAllTimers();

    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(true);
  });

  it("waits exponentially longer between each retry", () => {
    const func = jest.fn().mockReturnValue(false);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(func).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(2000);
    expect(func).toHaveBeenCalledTimes(3);

    jest.advanceTimersByTime(4000);
    expect(func).toHaveBeenCalledTimes(4);
    expect(callback).toHaveBeenCalledWith(false);
  });
});
