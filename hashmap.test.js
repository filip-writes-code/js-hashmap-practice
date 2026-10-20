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

it("gets keys", () => {
  testHashMap.set("chevy", "bolt");
  expect(testHashMap.get("chevy")).toEqual(["chevy", "bolt"]);
  expect(testHashMap.get("ford")).toEqual(undefined);
});

it("check if keys are present", () => {
  testHashMap.set("chevy", "bolt");
  expect(testHashMap.has("chevy")).toBe(true);
  expect(testHashMap.has("ford")).toBe(false);
});

it("removes keys", () => {
  testHashMap.set("chevy", "bolt");
  expect(testHashMap.remove("chevy")).toBe(true);
});

it("remove(key) returns false when the key does not exist", () => {
  testHashMap.set("chevy", "bolt");
  expect(testHashMap.remove("ford")).toBe(false);
});

test("length() returns the correct number", () => {
  testHashMap.set("chevy", "bolt");
  testHashMap.set("ford", "taurus");
  expect(testHashMap.length()).toBe(2);
});

test("length() returns the correct number", () => {
  testHashMap.set("chevy", "bolt");
  expect(testHashMap.length()).toBe(1);
});

test("clear() clears", () => {
  testHashMap.set("chevy", "bolt");
  testHashMap.clear();
  expect(testHashMap.buckets).toEqual([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
});

test("clear() clears", () => {
  testHashMap.set("chevy", "bolt");
  testHashMap.set("ford", "taurus");
  expect(testHashMap.keys()).toEqual(["chevy", "ford"]);
});
