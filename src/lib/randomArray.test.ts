import { randomArray } from "./randomArray";

const mockItems = [
  { id: 1, name: "Card 1" },
  { id: 2, name: "Card 2" },
  { id: 3, name: "Card 3" },
  { id: 4, name: "Card 4" },
];

test("same length", () => {
  const res = randomArray(mockItems);
  expect(res).toHaveLength(mockItems.length);
});

test("contains all original items", () => {
  const result = randomArray(mockItems);
  expect(result).toEqual(expect.arrayContaining(mockItems));
});

test("mutate original array", () => {
  const original = [...mockItems];
  randomArray(mockItems);
  expect(mockItems).not.toEqual(original);
});

test("handles empty array", () => {
  expect(randomArray([])).toEqual([]);
});

test("handles single item", () => {
  expect(randomArray([42])).toEqual([42]);
});
