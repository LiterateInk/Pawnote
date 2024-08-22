interface QueueItem {
  promise: () => Promise<unknown>
  resolve: (value: any) => void
  reject: (error?: any) => void
}

export class Queue {
  private queue: QueueItem[] = [];
  private pendingPromise: boolean = false;

  public push<T extends unknown>(promise: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject
      });

      // Attempt to dequeue only if nothing is pending
      if (!this.pendingPromise) {
        this.dequeue();
      }
    });
  }

  private dequeue() {
    if (this.pendingPromise) return false; // Ensure only one pending promise

    const item = this.queue.shift();
    if (!item) return false;

    this.pendingPromise = true; // Mark that a promise is now pending

    item.promise()
      .then((value) => {
        item.resolve(value);
        this.pendingPromise = false; // Clear pending state after resolve
        this.dequeue(); // Start the next item in the queue
      })
      .catch((err) => {
        item.reject(err);
        this.pendingPromise = false; // Clear pending state after reject
        this.dequeue(); // Start the next item in the queue
      });

    return true;
  }
}
