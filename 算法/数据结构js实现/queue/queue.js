class Queue {
  constructor() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
  }

  enqueue(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
  }

  dequeue() {
    const oldestIndex = this._oldestIndex;
    const newestIndex = this._newestIndex;
    let deletedData = null;
    if (oldestIndex !== newestIndex) {
      deletedData = this._storage[oldestIndex];
      delete this._storage[oldestIndex];
      this._oldestIndex++;
      return deletedData;
    }
  }

  get size() {
    return this._newestIndex - this._oldestIndex;
  }
}

const queue = new Queue();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.display());
