import { axiosClient } from "../transport/axiosClient";
import { rateLimiter } from "./rateLimitter";
import { circuitBreaker } from "./circuitBreaker";
import { tokenGuard } from "../auth/tokenGuard";
import { normalizeError } from "./errorNormalizer";
import { createTrace } from "../observability/trace";
import { log } from "../observability/logger";
import { recordMetric } from "../observability/metrics";
import { checkPerformanceBudget } from "../observability/performanceBudget";
import { chaosInjector } from "../chaos/chaosInjector";

/**
 * REQUEST ORCHESTRATOR
 * ---------------------------------------------------
 *
 * This file acts as the **control plane** of the entire
 * networking architecture.
 *
 * Instead of allowing requests to directly hit the
 * HTTP client, every request flows through this
 * orchestration pipeline.
 *
 * Responsibilities:
 *
 * • Request governance
 * • Resilience control
 * • Observability
 * • Error normalization
 *
 * Execution Pipeline
 * ---------------------------------------------------
 *
 * 1. Create distributed trace
 * 2. Apply client rate limiting
 * 3. Validate circuit breaker state
 * 4. Ensure authentication token validity
 * 5. Inject chaos (dev resilience testing)
 * 6. Execute HTTP request
 * 7. Measure performance
 * 8. Record metrics and logs
 * 9. Normalize errors
 */

export const orchestrateRequest = async (config: any) => {
  const trace = createTrace();

  const start = Date.now();

  try {
    /**
     * Prevent burst traffic from the client.
     */
    await rateLimiter();

    /**
     * Prevent cascading failures when backend
     * services become unstable.
     */
    circuitBreaker.check();

    /**
     * Ensure authentication token is valid.
     */
    await tokenGuard();

    /**
     * Chaos engineering:
     * randomly simulate failures in development
     * to verify resilience systems.
     */
    chaosInjector();

    /**
     * Execute HTTP request via transport layer.
     */
    const response = await axiosClient(config);

    const duration = Date.now() - start;

    /**
     * Monitor slow API calls.
     */
    checkPerformanceBudget(config.url, duration);

    /**
     * Record success metrics.
     */
    recordMetric("api_success");

    /**
     * Structured logging for observability.
     */
    console.log("Hi")
    log({
      traceId: trace.id,
      message: "API success",
      endpoint: config.url,
      duration,
    });

    return response.data;
  } catch (error: any) {
    /**
     * Record failure metrics.
     */
    recordMetric("api_failure");

    /**
     * Normalize error structure.
     */
    const normalized = normalizeError(error);

    /**
     * Notify circuit breaker of failure.
     */
    circuitBreaker.recordFailure();

    /**
     * Log error event.
     */
    log({
      traceId: trace.id,
      message: "API error",
      endpoint: config?.url,
      error: normalized,
    });

    throw normalized;
  }
};