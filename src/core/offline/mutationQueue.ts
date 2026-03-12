import { MMKV } from "react-native-mmkv";

/**
 * OFFLINE MUTATION QUEUE
 *
 * Ensures mutations survive:
 *
 * - app restart
 * - OS process kill
 * - network loss
 *
 * The queue is stored in persistent storage.
 */

const storage = new MMKV();

export const enqueueMutation = (mutation: any) => {
  const queue = JSON.parse(storage.getString("queue") || "[]");

  queue.push(mutation);

  storage.set("queue", JSON.stringify(queue));
};

export const getQueue = () => {
  return JSON.parse(storage.getString("queue") || "[]");
};