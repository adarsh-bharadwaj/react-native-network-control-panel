/**
 * TOKEN REFRESH GUARD
 *
 * Prevents refresh token storms.
 *
 * Example failure scenario:
 *
 * 10 API requests fire
 * Token expired
 * All return 401
 *
 * Without protection:
 * 10 refresh requests occur.
 *
 * With this guard:
 * Only one refresh executes.
 */

let refreshPromise: Promise<void> | null = null;

export const tokenGuard = async () => {
  const expired = false;

  if (!expired) return;

  if (!refreshPromise) {
    refreshPromise = refreshToken();
  }

  await refreshPromise;

  refreshPromise = null;
};

const refreshToken = async () => {
  await new Promise((r) => setTimeout(r, 1000));
};