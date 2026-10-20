const HashMap = require("./hashmap.js");

let testHashMap;

beforeEach(() => {
  testHashMap = new HashMap();
});

it("creates a new hashmap", () => {
  expect(testHashMap.capacity).toBe(16);
  expect(testHashMap.loadFactor).toBe(0.75);
});

it("hashes correctly", () => {
  expect(testHashMap.hash("Cassandra")).toBe(8);
  expect(testHashMap.hash("Zola")).toBe(10);
  expect(testHashMap.hash("chevy")).toBe(3);
});

it("sets keys", () => {
  testHashMap.set("chevy", "bolt");
  expect(testHashMap.buckets[3][0]).toEqual(["chevy", "bolt"]);
});

it("overwrittes existing keys", () => {
  testHashMap.set("chevy", "bolt");
  testHashMap.set("chevy", "bolt 2027");
  expect(testHashMap.buckets[3][0]).toEqual(["chevy", "bolt 2027"]);
});
