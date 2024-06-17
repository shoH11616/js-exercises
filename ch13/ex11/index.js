/**
 * Calls the received function `func` and if `func` returns a resolved Promise, it ends there.
 * If `func` returns a rejected Promise, it retries the call to `func` after a certain waiting time.
 * The waiting time is 1 second, 2 seconds, 4 seconds, ... doubling according to the number of calls to `func`.
 * If it fails even after `maxRetry` retries, it ends there.
 * The call to `retryWithExponentialBackoff` is completed immediately, and the call to `func` is performed asynchronously.
 * When `func` returns a resolved Promise, or when it fails and ends after maxRetry retries, the result (resolved/rejected) is used as an argument and the function `callback` is called.
 * @param {Function} func - The function to retry
 * @param {number} maxRetry - The maximum number of retries
 * @return {Promise} - A promise that resolves or rejects according to the result of `func`
 */
export function retryWithExponentialBackoff(func, maxRetry) {
  let attempt = 0;

  function retry() {
    return func().catch((err) => {
      if (attempt < maxRetry) {
        attempt++;
        return new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        ).then(retry);
      } else {
        throw err;
      }
    });
  }

  return retry();
}
