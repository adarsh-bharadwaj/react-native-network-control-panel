/**
 * CHAOS INJECTOR
 * ------------------------
 *
 * Chaos engineering intentionally introduces
 * failures to test system resilience.
 *
 * Inspired by Netflix's Chaos Monkey.
 *
 * This helps verify:
 *
 * • retry systems
 * • circuit breakers
 * • offline queues
 */

const FAILURE_RATE = 0.1;

/**
 * Randomly throws errors to simulate
 * unstable network conditions.
 */
export const chaosInjector = () => {
  if (__DEV__) {
    const random = Math.random();

    if (random < FAILURE_RATE) {
      throw new Error("Injected chaos failure");
    }
  }
};