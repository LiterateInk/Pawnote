interface QueueItem {
  promise: () => Promise<unknown>
  resolve: (value: any) => void
  reject: (err?: any) => void
}

export default class Queue {
  queue: QueueItem[] = [];
  pendingPromise = false;
  workingOnPromise = false;

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

  private dequeue() {
    if (this.workingOnPromise) return false;

    const item = this.queue.shift();
    if (!item) return false;

    try {
      this.workingOnPromise = true;

      item.promise()
        .then((value) => {
          this.workingOnPromise = false;
          item.resolve(value);
          this.dequeue();
        })
        .catch((err) => {
          this.workingOnPromise = false;
          item.reject(err);
          this.dequeue();
        });
    }
    catch (err) {
      this.workingOnPromise = false;
      item.reject(err);
      this.dequeue();
    }

    return true;
  }
}
