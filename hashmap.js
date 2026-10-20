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
}

module.exports = HashMap;
