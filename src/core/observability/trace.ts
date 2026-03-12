import { v4 as uuid } from "uuid";

/**
 * TRACE SYSTEM
 *
 * Each request receives a unique ID.
 *
 * This allows engineers to track
 * a request across multiple services.
 */

export const createTrace = () => ({
  id: uuid(),
  start: Date.now(),
});