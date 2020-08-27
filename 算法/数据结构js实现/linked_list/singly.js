/**
 * 单项链表
 */

// 结点
class Node {
  constructor(element) {
    this.element = element; // 当前结点元素
    this.next = null; // 下一个结点指针
  }
}

// 链表类
class LList {
  head = new Node('head');

  find(item) {
    let currNode = this.head;
    while (currNode.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  findPrev(item) {
    let currNode = this.head;
    while (currNode.next !== null && currNode.next.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  insert(newElement, item) {
    const newNode = new Node(newElement);
    const currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
  }

  remove(item) {
    const prevNode = this.findPrev(item);
    const currNode = this.find(item);
    if (prevNode.next !== null) {
      prevNode.next = prevNode.next.next;
      currNode.next = null;
    }
  }

  display() {
    let currNode = this.head;
    while (currNode.next !== null) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }
}

const fruits = new LList();

fruits.insert('Apple', 'head');
fruits.insert('Banana', 'Apple');
fruits.insert('Pear', 'Banana');
fruits.insert('Grape', 'Pear');

fruits.display();

fruits.remove('Banana');
console.log('----------------------');
fruits.display();
