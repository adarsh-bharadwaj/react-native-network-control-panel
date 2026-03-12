/**
 * STRUCTURED LOGGER
 * -----------------------
 *
 * Logging in production systems must be structured.
 *
 * Instead of printing plain strings:
 *
 * ❌ console.log("API failed")
 *
 * We log structured events that can be
 * indexed by monitoring platforms.
 *
 * Example production destinations:
 *
 * • Datadog
 * • Sentry
 * • New Relic
 * • CloudWatch
 */

type LogEvent = {
  traceId?: string;
  message: string;
  endpoint?: string;
  duration?: number;
  error?: any;
};

/**
 * Central logging function
 */
export const log = (event: LogEvent) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ...event,
  };

  /**
   * Development logging
   */
  if (__DEV__) {
    console.log("[NETWORK]", logEntry);
  }

  /**
   * Production systems would send logs
   * to an external monitoring platform.
   *
   * Example:
   *
   * sendToDatadog(logEntry)
   */
};