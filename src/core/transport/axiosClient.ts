import axios from "axios";

/**
 * TRANSPORT LAYER
 * ----------------
 * This is the lowest level of the networking stack.
 *
 * Responsibilities:
 *
 * - Configure HTTP client
 * - Base URL
 * - Timeouts
 * - Default headers
 *
 * IMPORTANT:
 * This layer MUST NOT know about:
 *
 * ❌ Authentication
 * ❌ Business logic
 * ❌ Retry policies
 * ❌ Error normalization
 *
 * Those responsibilities belong to higher layers.
 */

export const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",

  /**
   * Mobile networks are unpredictable.
   * Timeouts prevent requests from hanging forever.
   */
  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
  },
});