interface QueueItem {
  promise: () => Promise<unknown>
  resolve: (value: any) => void
  reject: (error?: any) => void
}

export class Queue {
  private queue: QueueItem[] = [];
  private pending = false;

  public push<T extends unknown>(promise: () => Promise<T>) {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject
      });

      this.dequeue();
    });
  }

  private dequeue(): void {
    if (this.pending) return;

    const item = this.queue.shift();
    if (!item) return;

    this.pending = true;

    item.promise()
      .then((value) => {
        item.resolve(value);
      })
      .catch((err) => {
        item.reject(err);
      })
      .finally(() => {
        this.pending = false;
        this.dequeue();
      });
  }
}
