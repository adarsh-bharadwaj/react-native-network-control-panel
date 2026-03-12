/**
 * PERFORMANCE BUDGET
 * -----------------------
 *
 * Mobile applications must enforce
 * performance budgets.
 *
 * Example:
 *
 * API request should complete in < 2 seconds.
 *
 * If a request exceeds the budget,
 * we log a warning for monitoring systems.
 */

const API_BUDGET_MS = 2000;

export const checkPerformanceBudget = (
  endpoint: string,
  duration: number
) => {
  if (duration > API_BUDGET_MS) {
    console.warn("[PERFORMANCE_BUDGET_EXCEEDED]", {
      endpoint,
      duration,
      budget: API_BUDGET_MS,
    });
  }
};