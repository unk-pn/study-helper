import { formatDate } from "./formatDate";

test("working", () => {
  expect(formatDate("1212-12-12T12:00:00")).toBe("12.12.1212");
});

test("handles null", () => {
  expect(formatDate(null)).toBe(null);
});
