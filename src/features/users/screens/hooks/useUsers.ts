import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userService";

/**
 * DOMAIN HOOK
 * --------------------
 *
 * This hook represents the interface between
 * the UI layer and the networking system.
 *
 * UI components should NEVER call the
 * networking layer directly.
 *
 * Instead they interact with domain hooks
 * that encapsulate:
 *
 * • data fetching
 * • caching
 * • retry behaviour
 * • background refetching
 *
 * React Query handles:
 *
 * ✔ request deduplication
 * ✔ stale cache management
 * ✔ background synchronization
 * ✔ loading / error states
 */

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],

    /**
     * queryFn represents the data fetcher.
     * This will call the service layer which
     * ultimately routes through the network
     * orchestration pipeline.
     */
    queryFn: getUsers,

    /**
     * Data remains fresh for 60 seconds.
     * During this period React Query will
     * serve cached data instantly.
     */
    staleTime: 60 * 1000,

    /**
     * Prevent excessive refetching.
     */
    refetchOnWindowFocus: false,

    /**
     * Network resilience:
     * automatically retry failed requests.
     */
    retry: 2,
  });
};