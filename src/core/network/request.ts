import { scheduleRequest } from "./scheduler";
import { orchestrateRequest } from "./orchestrator";

/**
 * CENTRAL REQUEST ENTRY
 *
 * All requests pass through scheduler first.
 * This enables request prioritization.
 */

export const request = async (config: any) => {
  return new Promise((resolve, reject) => {
    scheduleRequest({
      priority: config.priority || "NORMAL",

      execute: async () => {
        try {
          const result = await orchestrateRequest(config);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      },
    });
  });
};