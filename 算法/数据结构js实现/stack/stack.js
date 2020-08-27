class Stack {
  constructor() {
    this._size = 0;
    this._storage = {};
  }

  push(data) {
    const size = this._size++;
    this._storage[size] = data;
  }

  pop() {
    const size = this._size;
    const deleteData = this._storage[size];
    // 栈不为空时才能pop
    if (size) {
      delete this._storage[size];

      this._size--;
      return deleteData;
    }
  }

  get length() {
    return this._size;
  }

  display() {
    return this._storage;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.display());
