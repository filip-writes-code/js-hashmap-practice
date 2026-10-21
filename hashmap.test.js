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

test("keys() works", () => {
  testHashMap.set("chevy", "bolt");
  testHashMap.set("ford", "taurus");
  expect(testHashMap.keys()).toEqual(["chevy", "ford"]);
});

test("values() works", () => {
  testHashMap.set("chevy", "bolt");
  testHashMap.set("ford", "taurus");
  expect(testHashMap.values()).toEqual(["bolt", "taurus"]);
});

test("entries() works", () => {
  testHashMap.set("chevy", "bolt");
  testHashMap.set("ford", "taurus");
  expect(testHashMap.entries()).toEqual([
    ["chevy", "bolt"],
    ["ford", "taurus"],
  ]);
});

test("grow() works", () => {
  testHashMap.set("chevy", "bolt");
  testHashMap.set("ford", "taurus");
  testHashMap.grow();
  expect(testHashMap.capacity).toBe(32);
  expect(testHashMap.entries()).toEqual([
    ["chevy", "bolt"],
    ["ford", "taurus"],
  ]);
});

test("loadFactorOK()", () => {
  expect(testHashMap.capacity).toBe(16);
  expect(testHashMap.loadFactor).toBe(0.75);
  expect(testHashMap.loadFactorOK()).toBe(true);
});

test("the hashmap grows!", () => {
  testHashMap.set("apple", "red");
  testHashMap.set("banana", "yellow");
  testHashMap.set("carrot", "orange");
  testHashMap.set("dog", "brown");
  testHashMap.set("elephant", "gray");
  testHashMap.set("frog", "green");
  testHashMap.set("grape", "purple");
  testHashMap.set("hat", "black");
  testHashMap.set("ice cream", "white");
  testHashMap.set("jacket", "blue");
  testHashMap.set("kite", "pink");
  testHashMap.set("lion", "golden");
  expect(testHashMap.capacity).toBe(16);
  testHashMap.set("chevy", "bolt");
  expect(testHashMap.capacity).toBe(32);
});
