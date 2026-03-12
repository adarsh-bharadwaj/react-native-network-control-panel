/**
 * CLIENT RATE LIMITER
 * -----------------------
 *
 * Mobile applications can accidentally
 * produce request bursts.
 *
 * Example scenarios:
 *
 * • user rapidly tapping buttons
 * • multiple components loading simultaneously
 * • background refresh triggers
 *
 * If uncontrolled, this can overload backend APIs.
 *
 * The client-side rate limiter smooths bursts
 * by spacing requests.
 */

const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_DURATION = 1000;

let requestTimestamps: number[] = [];

export const rateLimiter = async () => {
  const now = Date.now();

  /**
   * Remove timestamps outside the current window
   */
  requestTimestamps = requestTimestamps.filter(
    (timestamp) => now - timestamp < WINDOW_DURATION
  );

  /**
   * If we exceed allowed requests,
   * pause execution until capacity frees.
   */
  if (requestTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const earliest = requestTimestamps[0];

    const waitTime = WINDOW_DURATION - (now - earliest);

    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  /**
   * Record this request
   */
  requestTimestamps.push(Date.now());
};