class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    key = key.toUpperCase();

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    //check if the key exists
    let entry = bucket.find(([k]) => k === key);
    //if it exists, overwrite the value
    if (entry) {
      entry[1] = value;
    } else {
      //if not add it to the bucket
      bucket.push([key, value]);
    }
  }

  // Takes a key as an argument and returns the value that is associated with it.
  // If the key is not found, return undefined.
  get(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    let entry = bucket.find(([k]) => k === key);
    return entry;
  }

  has(key) {
    // takes a key as an argument and returns a boolean based on whether or not the key is in the hash map.
    let index = this.hash(key);
    let bucket = this.buckets[index];

    const doesExist = bucket.some((element) => {
      return element[0] === key;
    });
    return doesExist ? true : false;
  }

  // remove(key) takes a key as an argument.
  // If the given key is in the hash map, it should remove the entry with that key then return true.
  // If the key isn’t in the hash map, it should return false.
  remove(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];

    let bucketIndex = bucket.findIndex((element) => element[0] === key);

    if (bucketIndex >= 0) {
      bucket.splice(bucketIndex, 1);
      return true;
    } else {
      return false;
    }
  }

  // length() returns the number of stored keys in the hash map.
  length() {
    let totalNumber = 0;
    this.buckets.forEach((bucket) => {
      totalNumber += bucket.length;
    });
    return totalNumber;
  }

  // clear() removes all entries in the hash map.
  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  // keys() returns an array containing all the keys (not values) inside the hash map.
  keys() {
    let keysArray = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((keyPair) => {
        keysArray.push(keyPair[0]);
      });
    });
    return keysArray;
  }
  // values() returns an array containing all the values (not keys) inside the hash map.
  values() {
    let valuesArray = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((keyPair) => {
        valuesArray.push(keyPair[1]);
      });
    });
    return valuesArray;
  }
}

module.exports = HashMap;
