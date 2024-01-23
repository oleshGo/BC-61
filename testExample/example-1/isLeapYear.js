const isLeapYear = (year) => {
  if (year === undefined) {
    throw new Error("year must exist");
  }
  if (typeof year !== "number") {
    throw new Error("year must be number");
  }
  if (!Number.isInteger(year)) {
    throw new Error("year must be an integer");
  }
  const date = new Date(year, 2, 0);
  const days = date.getDate();
  return days === 29;
};

module.exports = isLeapYear;
