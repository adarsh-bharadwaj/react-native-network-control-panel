import { getQueue } from "./mutationQueue";

/**
 * REPLAY ENGINE
 *
 * Mutations must replay sequentially.
 *
 * Parallel replay could cause:
 *
 * - duplicate payments
 * - inconsistent state
 * - backend overload
 */

export const replayQueue = async () => {
  const queue = getQueue();

  for (const mutation of queue) {
    try {
      await mutation.execute();
    } catch (err) {
      break;
    }
  }
};