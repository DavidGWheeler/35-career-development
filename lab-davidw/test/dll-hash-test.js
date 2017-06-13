'use strict';

const expect = require('chai').expect;
const faker = require('faker');
const DLLHashTable = require('../lib/dll-hash.js');

describe('Testing the DLL Hash Table methods', function() {
  before(done => {
    this.fakeKeys = [...Array(100)].map(key => key = faker.hacker.phrase());
    done();
  });

  after(done => {
    delete this.fakeKeys;
    done();
  });

  beforeEach(done => {
    this.dllHashTable = new DLLHashTable();
    done();
  });

  afterEach(done => {
    this.dllHashTable = null;
    done();
  });


  describe('Intantiating a new DLL Hash Table', () => {
    it('should instantiate a new empty dll hash table', done => {
      expect(this.dllHashTable).to.not.be.null;
      expect(this.dllHashTable).to.be.instanceOf(DLLHashTable);
      done();
    });

    it('should have a default size of 8192', done => {
      expect(this.dllHashTable.buckets.length).to.equal(8192);
      done();
    });

    it('should be able to create a new dll hash table of specified size', done => {
      this.dllHashTable = new DLLHashTable(1024);
      expect(this.dllHashTable.buckets.length).to.equal(1024);
      done();
    });

    it('should have a default buckets property which is an array of doubly linked lists', done => {
      expect(this.dllHashTable.buckets).to.be.instanceOf(Array);
      expect(this.dllHashTable.buckets[0]).to.be.instanceOf(Object);
      done();
    });
  });

  describe('Testing the hash function', () => {
    it('should hash a key', done => {
      let expectHash = this.dllHashTable.hashKey('test');
      let actualHash = 448;
      expect(expectHash).to.equal(actualHash);
      done();
    });

    it('should always hash a key to less than the size', done => {
      this.fakeKeys.forEach(key => {
        expect(this.dllHashTable.hashKey(key)).to.be.lessThan(8192);
      });
      done();
    });

    it('should be able to hash a key of various sizes', done => {
      let variousKeys = [1, 190, 25000, 1000000000].map(key => key = faker.hacker.phrase());
      variousKeys.forEach(key => {
        expect(this.dllHashTable.hashKey(key)).to.be.lessThan(8192);
      });
      done();
    });
  });

  describe('Testing the set method', () => {
    it('should not have a value before a node is added', done => {
      let expectKey = this.dllHashTable.hashKey('test key');
      expect(this.dllHashTable.buckets[expectKey].head).to.be.null;
      done();
    });

    it('should add a new value to the hash table', done => {
      let expectKey = this.dllHashTable.hashKey('test key');
      this.dllHashTable.set('test key', 'test value');
      expect(this.dllHashTable.buckets[expectKey].head.val).to.equal('test value');
      expect(this.dllHashTable.buckets[expectKey].length).to.equal(1);
      done();
    });

    it('should add a second value with the same key', done => {
      let expectKey = this.dllHashTable.hashKey('test key');
      this.dllHashTable.set('test key', 'test value');
      this.dllHashTable.set('test key', 'test value');
      expect(this.dllHashTable.buckets[expectKey].length).to.equal(2);
      done();
    });
  });

  describe('Testing the get method', () => {
    it('should retrieve a value from the hash table by the key', done => {
      this.dllHashTable.set('test key', 'test value');
      let expectVal = 'test value';
      let actualVal = this.dllHashTable.get('test key');
      expect(expectVal).to.equal(actualVal.head.val);
      done();
    });

    it('should return null if the key is not in the table', done => {
      expect(this.dllHashTable.get('blah')).to.be.null;
      done();
    });
  });

  describe('Testing the remove method', () => {
    it('should remove an item from the hash table', done => {
      this.dllHashTable.set('testkey', 'testvalue');
      let expectVal = 'testvalue';
      let actualVal = this.dllHashTable.get('testkey');
      expect(expectVal).to.equal(actualVal.head.val);
      this.dllHashTable.remove('testkey');
      expect(expectVal).not.to.equal(actualVal.val);
      done();
    });

    it('should reset to an empty DLL object', done => {
      let expectKey = this.dllHashTable.hashKey('testkey');
      expect(this.dllHashTable.buckets[expectKey].head).to.be.null;
      done();
    });

    it('should throw an error if given a key that does not exist', done => {
      expect(this.dllHashTable.remove('error')).to.Throw;
      done();
    });
  });
});
