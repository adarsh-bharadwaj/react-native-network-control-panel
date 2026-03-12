/**
 * CIRCUIT BREAKER
 * ---------------------
 *
 * Prevents cascading failures when
 * backend systems become unstable.
 *
 * Without a circuit breaker:
 *
 * failing API -> infinite retries -> server collapse
 *
 * With a circuit breaker:
 *
 * failure threshold reached → requests blocked temporarily
 */

const FAILURE_THRESHOLD = 5;
const RESET_TIMEOUT = 10000;

let failureCount = 0;
let lastFailureTime: number | null = null;

export const circuitBreaker = {
  /**
   * Called before request execution.
   * Throws if circuit is open.
   */
  check() {
    if (failureCount < FAILURE_THRESHOLD) return;

    const now = Date.now();

    if (
      lastFailureTime &&
      now - lastFailureTime < RESET_TIMEOUT
    ) {
      throw {
        type: "CIRCUIT_OPEN",
        message: "Circuit breaker active",
      };
    }

    /**
     * Reset circuit after cooldown
     */
    failureCount = 0;
  },

  /**
   * Records request failure
   */
  recordFailure() {
    failureCount += 1;
    lastFailureTime = Date.now();
  },
};