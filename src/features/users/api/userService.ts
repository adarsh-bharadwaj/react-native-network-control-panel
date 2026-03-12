import { request } from "../../../core/network/request";

/**
 * USER SERVICE
 * -----------------------------------
 *
 * This file represents the **Domain Service Layer**.
 *
 * Responsibilities:
 *
 * • Define API endpoints related to the Users domain
 * • Hide HTTP implementation details from UI
 * • Provide reusable functions for domain operations
 *
 * UI components should NEVER know:
 *
 * ❌ API endpoints
 * ❌ HTTP methods
 * ❌ request configuration
 *
 * Instead, UI interacts with domain hooks like:
 *
 * useUsers()
 *
 * Which internally call this service.
 *
 * Architecture Flow
 * -----------------
 *
 * UI
 * ↓
 * Hooks (React Query)
 * ↓
 * Services (this file)
 * ↓
 * Request Layer
 * ↓
 * Request Orchestrator
 * ↓
 * Resilience Systems
 * ↓
 * Transport (Axios)
 *
 * This separation keeps networking predictable
 * and prevents architectural drift in large apps.
 */

/**
 * Fetch all users
 *
 * Example endpoint:
 * https://jsonplaceholder.typicode.com/users
 *
 * In a production backend this might be:
 *
 * /api/v1/users
 */
export const getUsers = async () => {
  return request({
    method: "GET",
    url: "/users",
    priority: "HIGH",
  });
};

/**
 * Fetch a single user by ID
 *
 * Demonstrates parameterized endpoints.
 */
export const getUserById = async (userId: number) => {
  return request({
    method: "GET",
    url: `/users/${userId}`,
  });
};

/**
 * Create a new user
 *
 * Demonstrates POST mutation.
 */
export const createUser = async (user: any) => {
  return request({
    method: "POST",
    url: "/users",
    data: user,
  });
};

/**
 * Update an existing user
 *
 * Demonstrates PUT mutation.
 */
export const updateUser = async (userId: number, user: any) => {
  return request({
    method: "PUT",
    url: `/users/${userId}`,
    data: user,
  });
};

/**
 * Delete a user
 *
 * Demonstrates DELETE mutation.
 */
export const deleteUser = async (userId: number) => {
  return request({
    method: "DELETE",
    url: `/users/${userId}`,
  });
};