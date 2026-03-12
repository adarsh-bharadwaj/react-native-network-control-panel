import mitt from "mitt";

/**
 * EVENT BUS
 *
 * Decouples real-time events
 * from application UI.
 *
 * Instead of:
 *
 * socket -> screen
 *
 * We use:
 *
 * socket -> domain event -> UI
 */

export const eventBus = mitt();