/**
 * REQUEST SCHEDULER
 * -----------------------
 *
 * In complex mobile applications,
 * not all requests should be treated equally.
 *
 * Example priorities:
 *
 * HIGH
 * • login
 * • checkout
 * • payment
 *
 * NORMAL
 * • feed loading
 * • profile data
 *
 * LOW
 * • analytics
 * • background sync
 *
 * Without prioritization, background requests
 * can delay critical user actions.
 */

type Priority = "HIGH" | "NORMAL" | "LOW";

type ScheduledTask = {
  priority: Priority;
  execute: () => Promise<any>;
};

const queues: Record<Priority, ScheduledTask[]> = {
  HIGH: [],
  NORMAL: [],
  LOW: [],
};

let running = false;

export const scheduleRequest = (task: ScheduledTask) => {
  queues[task.priority].push(task);

  processQueue();
};

const processQueue = async () => {
  if (running) return;

  running = true;

  while (true) {
    const task =
      queues.HIGH.shift() ||
      queues.NORMAL.shift() ||
      queues.LOW.shift();

    if (!task) break;

    try {
      await task.execute();
    } catch (err) {
      console.error("Scheduled request failed", err);
    }
  }

  running = false;
};