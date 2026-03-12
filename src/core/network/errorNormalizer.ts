/**
 * ERROR NORMALIZER
 * ----------------------
 *
 * API clients return wildly different
 * error structures depending on:
 *
 * • HTTP client
 * • backend service
 * • network failures
 *
 * This module converts all errors into
 * a predictable application error format.
 *
 * This dramatically simplifies UI logic.
 */

export const normalizeError = (error: any) => {
  /**
   * Network failure (no response)
   */
  if (!error.response) {
    return {
      type: "NETWORK_ERROR",
      message: "Network connection failed",
    };
  }

  const status = error.response.status;

  /**
   * Authentication errors
   */
  if (status === 401) {
    return {
      type: "AUTH_ERROR",
      message: "Unauthorized request",
    };
  }

  /**
   * Validation errors
   */
  if (status === 400) {
    return {
      type: "VALIDATION_ERROR",
      message: error.response.data?.message || "Invalid request",
    };
  }

  /**
   * Server failures
   */
  if (status >= 500) {
    return {
      type: "SERVER_ERROR",
      message: "Server encountered an error",
    };
  }

  /**
   * Unknown error
   */
  return {
    type: "UNKNOWN_ERROR",
    message: error.message || "Unexpected error occurred",
  };
};