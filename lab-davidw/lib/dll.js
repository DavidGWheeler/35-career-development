
'use strict';

const Node = function(val, next=null, prev=null) {
  this.val = val;
  this.next = next;
  this.prev = prev;
};

const DLL = module.exports = function() {
  this.head = null;
  this.tail = null;
  this.length = 1;
};

DLL.prototype.append = function(val) {
  if(!val) throw new Error('Please provide a value');
  if(!this.head) return this.head = this.tail = new Node(val);

  this.head.next = new Node(val);
  this.head.next.prev = this.head;
  this.head = this.head.next;
  this.length++;
  return this.head;
};

DLL.prototype.prepend = function(val) {
  if(!val) throw new Error('must provide value');
  if(!this.tail) return this.tail = this.head = new Node(val);

  this.tail.prev = new Node(val);
  this.tail.prev.next = this.tail;
  this.tail = this.tail.prev;
  this.length++;
  return this.tail;
};

DLL.prototype.remove = function(val) {
  if(!val) throw new Error('must provide value');
  if(!this.tail) throw new Error('the list is empty');

  //check if the value passed is strictly equal to head's value.  if it is set this.head.prev to be new head
  if(val === this.head.val) {
    this.head = this.head.prev;
    //track the reduction in length of the list.
    this.length--;
    //if the value passed is not head's val, see if it is tail's val.  if true then set tail.next to the new tail
  } else if (val === this.tail.val) {
    this.tail = this.tail.next;
    //track the reduction in length of the list.
    this.length--;
  }

  //if value passed isn't head and tail exists and doesn't match val passed, assign the tail to equal currentNode
  let currentNode = this.tail;

  // check if currentNode's value is the value passed...
  for (let i = 0; i < this.length; i++) {
    if(currentNode.val === val) {
      // ...if it is, set the aka currentNode.prev as prevNode and tail.next as nextNode variables...
      let prevNode = currentNode.prev;
      let nextNode = currentNode.next;
      // ... then assign them as
      prevNode.next = nextNode;
      nextNode.prev = prevNode.prev;
      this.length--;
      return this;
    } else {
      // else, we will simply set currentNode.next to the currentNode
      currentNode = currentNode.next;
    }
  }
  //return the new DLL which will be length minus 1 and nolonger include the node with the passed value.
  return this;
};
