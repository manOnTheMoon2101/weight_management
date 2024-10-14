function formatPrismaDate(date) {
  if (!(date instanceof Date)) {
    throw new Error("Input must be a Date object");
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default formatPrismaDate;
