class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  class LinkedList {
    #length;
    #head;
    constructor() {
      this.#length = 0;
    }
  
    insert(value) {
      this.#head = new Node(value, this.#head);
      this.#length++;
    }
  
    insertList(value) {
      if(!this.#head) {
        this.insert(value)
      } else {
        let lastNode = this.#head;
        while (lastNode.next) {
          lastNode = lastNode.next;
        }
        lastNode.next = new Node(value);
        this.#length++;
      }
    }
  
    size() {
      return this.#length;
    }

    at(index) {
      if(index >= this.#length) {
        return undefined;
      }
      
      let currentIndex = 0;
      let tempNode = this.#head;
      while (currentIndex !== index) {
        currentIndex++;
        tempNode = tempNode.next
      }

      return tempNode;
    }

    join(separator) {
      let output = "";
      let tempNode = this.#head;
      let index = 0;
      while (index < this.#length) {
        output += tempNode.value
        if(tempNode.next) {
          output += separator
        }

        index++;
        tempNode = tempNode.next
      }

      return output;
    }

    map(mappingFn) {
      let output = new LinkedList();
      let tempNode = this.#head;
      while(tempNode) {
        output.insertList(mappingFn(tempNode.value))
        tempNode = tempNode.next;
      }

      return output;
    }

    filter(predicate) {
      let output = new LinkedList();
      let tempNode = this.#head;
      while(tempNode) {
        if(predicate(tempNode.value)) {
          output.insertList(tempNode.value);
        }
        tempNode = tempNode.next;
      }
      
      return output;
    }

    find(value) {
      let tempNode = this.#head;
      while(tempNode) {
        if(tempNode.value === value) {
          return tempNode;
        }

        tempNode = tempNode.next
      }

      return undefined;
    }
  }
  
  let list = new LinkedList();
  
  list.insert("zero");
  console.log('after insert: ', list.join(", "));
  
  list.insertList('first');
  console.log('after insert list: ', list.join(", "));
  
  console.log('list size: ', list.size());

  console.log('show item at 1: ', list.at(1));

  console.log('mapping...');
  let mapped = list.map((value) => value+2);
  console.log('List after map ', list.join(", "));
  console.log('Mapped list: ', mapped.join(", "));

  console.log('filtering...');
  let filtered = list.filter((value) => value === "first");
  console.log('Filtered list: ', filtered.join(", "));

  console.log('Find zero:', list.find('zero'));
  