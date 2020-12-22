// Singly linked list
// piece of data - val
// reference to next value - next

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
      this.length++;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++;
    }

    return this;
  }

  pop() {
    // if empty
    if (!this.head) return undefined;

    let previousValue = this.head;
    let nextValue = this.head.next;

    while (nextValue.next !== null) {
      previousValue = previousValue.next;
      nextValue = nextValue.next;
    }

    previousValue.next = null;
    this.tail = previousValue;
    this.length--;

    return this;
  }

  shift() {
    // removes the first element of the ll and returns it
    if (!this.head) return undefined;

    const shiftedValue = this.head;

    this.head = this.head.next;
    this.length--;

    return shiftedValue;
  }

  unshift(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.head = this.tail;
    } else {
      const prevHead = this.head;
      this.head = newNode;
      this.head.next = prevHead;
    }
    this.length++;
    return this;
  }

  get(idx) {
    // returns an item in it's position in the ll
    if (idx < 0 || idx >= this.length) return null;

    let node = this.head;
    for (let i = 0; i < this.length; i++) {
      if (i === idx) return node;
      node = node.next;
    }
  }

  set(idx, val) {
    // replace an item at idx with val

    const node = this.get(idx);
    if (!node) return false;

    node.val = val;
    return true;
  }

  insert(idx, val) {
    // insert new node at idx
    if (idx < 0 || idx > this.length) return false;
    // make them truthy/falsy
    if (idx === this.length) return !!this.push(val);
    if (idx === 0) return !!this.unshift(val);

    const newNode = new Node(val);
    const prev = this.get(idx - 1);
    const node = prev.next;

    prev.next = newNode;
    newNode.next = node;
    this.length++;
    return true;
  }

  remove(idx) {
    if (idx < 0 || idx > this.length) return undefined;
    if (idx === this.length) return this.pop();
    if (idx === 0) return this.shift();

    const prev = this.get(idx - 1);
    // previous node's next disappears
    prev.next = prev.next.next;
    this.length--;
    return true;
  }

  reverse() {
    // swap tail and head
    const head = this.head;
    this.head = this.tail;
    this.tail = head;

    const node = this.head.next;
    let next = node.next;
    let prev = next.next;
    node.next = this.head;

    let next, prev;

    for (let i = 1; i < this.length - 1; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
  }
}

const list = new SinglyLinkedList();

// PUSH

// head and tail are the same object
list.push("first item");

// we update .next property on the tail (head) to point to the new object
// we update tail to point to the same new object
list.push("second item");

// we update the .next on the tail, which is also .next (object) on the head
// to point to the new object, there is some nesting going on head.next.next... etc
// we update our tail to be the new object we just created, the same one which is currently
// on the head's .next.next
list.push("third item");

// PUSH

// POP

// start from the head
// let previous value be head
// let next value be head.next

// while next value.next !== null
// move previous value
// move next value

// in the end, set previous value.next to null
// set tail to previous value

// list.pop();

// POP

// SHIFT

// list.shift();

// SHIFT

//UNSHIFT

// list.unshift("add new item to the start");

//UNSHIFT

// GET

// console.log(list.get(1));

// GET

// SET

// console.log(list.set(1, "replaced the value"));

//SET

//INSERT

// console.log(list.insert(2, "inserted new item"));

//INSERT

// REMOVE

// list.remove(1);

//

console.log(list);
