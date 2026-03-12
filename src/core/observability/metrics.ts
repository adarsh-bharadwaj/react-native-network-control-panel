/**
 * METRICS COLLECTOR
 *
 * Collects runtime statistics
 * for monitoring systems.
 */

const metrics: Record<string, number> = {};

export const recordMetric = (name: string) => {
  metrics[name] = (metrics[name] || 0) + 1;
};