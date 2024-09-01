package api.private

class Queue {
    private val queue: MutableList<(suspend() -> Any)> = mutableListOf()
    private var pendingPromise: Boolean = false

    suspend fun <T : Any> push(promise: suspend () -> T) {
        this.queue.add(promise)

        if (!this.pendingPromise)
            this.dequeue()
    }

    private suspend fun dequeue(): Boolean {
        if (this.pendingPromise) return false

        val item = this.queue.removeLastOrNull() ?: return false

        this.pendingPromise = true

        item()

        return true
    }
}