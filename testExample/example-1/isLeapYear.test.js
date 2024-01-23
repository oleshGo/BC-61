const isLeapYear = require("./isLeapYear");

/*
2000 - true
2008 - true

2001 - false
1997 - false

2000.4 -> 'year must be an integer'
() -> 'year must exist'

'2000', {}, null, [], ()=>{}, true, false - 'year must be number'
*/

describe("isLeapYear", () => {
  // describe('sum', () => {})
  // describe('min', () => {})

  test("Should return true if year leap or false if not", () => {
    expect(isLeapYear(2008)).toBe(true);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(2001)).toBe(false);
    expect(isLeapYear(1997)).toBe(false);
  });

  it("Should return error -> year must be an integer if year not integer", () => {
    expect(() => isLeapYear(2000.4)).toThrow("year must be an integer");
    expect(() => isLeapYear(2005.1)).toThrow("year must be an integer");
  });

  it("Should return error -> year must exist if year not provided", () => {
    expect(() => isLeapYear()).toThrow("year must exist");
  });

  it("Should return error -> year must be number if year not integer", () => {
    expect(() => isLeapYear({})).toThrow("year must be number");
    expect(() => isLeapYear([])).toThrow("year must be number");
    expect(() => isLeapYear(() => {})).toThrow("year must be number");
    expect(() => isLeapYear(null)).toThrow("year must be number");
    expect(() => isLeapYear("2000")).toThrow("year must be number");
    expect(() => isLeapYear(true)).toThrow("year must be number");
    expect(() => isLeapYear(false)).toThrow("year must be number");
  });
});
