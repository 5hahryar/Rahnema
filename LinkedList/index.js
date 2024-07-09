class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  class LinkedList {
    constructor(origin) {
      this.origin = origin;
    }
  
    insert(node) {
      node.next = this.origin;
      this.origin = node;
    }
  
    insertList(node) {
      let tempNode = this.origin;
      while (tempNode.next) {
        tempNode = tempNode.next;
      }
      tempNode.next = node;
    }
  
    size() {
      let count = 1;
      let tempNode = this.origin
    while (tempNode.next) {
      count++;
      tempNode = tempNode.next
    }
      return count;
    }
  }
  
  let node = new Node('first');
  console.log('node');
  let list = new LinkedList(node);
  console.log(list);
  
  list.insert(new Node('zero'));
  console.log('after insert ', list);
  
  list.insertList(new Node('last'));
  console.log('after insert list ', list);
  
  console.log('list size ', list.size());
  