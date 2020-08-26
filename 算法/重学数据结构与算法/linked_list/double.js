/**
 * 双向链表
 */

// 结点
class Node {
  constructor(element) {
    this.element = element; // 当前结点元素
    this.next = null; // 下一个结点指针
    this.previous = null;
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

  findLast() {
    let currNode = this.head;
    while (currNode.next !== null) {
      currNode = currNode.next;
    }
    return currNode;
  }

  insert(newElement, item) {
    const newNode = new Node(newElement);
    const currNode = this.find(item); // 找到被插入结点
    newNode.next = currNode.next; // 新结点的下一项为前被插入结点的下一项
    newNode.previous = currNode; // 新结点的前一项为被插入结点
    currNode.next = newNode; // 被插入结点的下一项为新建结点
    if (newNode.next !== null) {
      newNode.next.previous = newNode;
    }
  }

  remove(item) {
    const currNode = this.find(item);
    if (currNode.next !== null) {
      currNode.previous.next = currNode.next;
      currNode.next.previous = currNode.previous;
      currNode.next = null;
      currNode.previous = null;
    } else {
      currNode.previous.next = null;
      currNode.previous = null;
    }
  }

  display() {
    let currNode = this.head;
    while (currNode.next !== null) {
      console.log(currNode.next.element);
      currNode = currNode.next;
    }
  }

  displayReverse() {
    let currNode = this.findLast();
    while (currNode.previous !== null) {
      console.log(currNode.element);
      currNode = currNode.previous;
    }
  }
}

const fruits = new LList();

fruits.insert('Apple', 'head');
fruits.insert('Banana', 'Apple');
fruits.insert('Pear', 'Banana');
fruits.insert('Grape', 'Pear');
fruits.insert('haha', 'Banana');

fruits.remove('Banana');

fruits.display();

console.log('----------------------');
fruits.displayReverse();
