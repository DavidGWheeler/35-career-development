'use strict';

const HashTable = module.exports = function(size=8192) {
  this.size = size;
  this.buckets = [...Array(this.size)];
};

HashTable.prototype.hashKey = function(key) {
  if(!key) throw new Error('key required for hash');
  let hash = key.split('').reduce((acc, curr) => acc + curr.charCodeAt(0), 0) % this.size;
  // NOTE This is where I need to handle any key collissions, and implement a linked list, fun to play like I know how to do that...

  return hash;
};

HashTable.prototype.set = function(key, value) {
  this.buckets[this.hashKey(key)] = value;
};

HashTable.prototype.get = function(key) {
  return this.buckets[this.hashKey(key)];
};

HashTable.prototype.remove = function(key) {
  let address = this.hashKey(key);
  this.buckets[address] ? delete this.buckets[address] : new Error('invalid key');
};
