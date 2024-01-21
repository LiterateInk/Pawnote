interface QueueItem {
  promise: () => Promise<unknown>
  resolve: (value: any) => void
  reject: (err?: any) => void
}

/// Stolen from <https://medium.com/@karenmarkosyan/how-to-manage-promises-into-dynamic-queue-with-vanilla-javascript-9d0d1f8d4df5>
/// Available at this gist : <https://gist.github.com/ogostos/a04869d68313ee51f496b2996026d8ed#file-five-js>
/// Thanks you, [@ogostos](github.com/ogostos)
export default class Queue {
  private queue: QueueItem[] = [];
  private pendingPromise = false;

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
    if (this.pendingPromise) return false;

    const item = this.queue.shift();
    if (!item) return false;

    try {
      this.pendingPromise = true;

      item.promise()
        .then((value) => {
          this.pendingPromise = false;
          item.resolve(value);
          this.dequeue();
        })
        .catch((err) => {
          this.pendingPromise = false;
          item.reject(err);
          this.dequeue();
        });
    }
    catch (err) {
      this.pendingPromise = false;
      item.reject(err);
      this.dequeue();
    }

    return true;
  }
}
