module.exports.isValideIsbnOrIsbn13 = (isbnOrIsbn13) => {
  if (!isbnOrIsbn13 || typeof isbnOrIsbn13 !== "string") return false;

  if (isbnOrIsbn13.length < 9 || isbnOrIsbn13.length > 13) return false;

  const onlyNumbersAndDashRegex = /^[0-9-]*$/;
  if (!onlyNumbersAndDashRegex.test(isbnOrIsbn13)) return false;

  return true;
};

module.exports.isValidZip = (zip) => {
  if (!zip || typeof zip !== "string") return false;

  const validZipRegex = /^\d{5}$/;
  if (!validZipRegex.test(zip)) return false;

  return true;
};

module.exports.addDaysToToday = (days) => {
  var futureDate = new Date();
  futureDate.setHours(23, 59, 59, 0);
  futureDate.setDate(futureDate.getDate() + days); // +1 to include last day until 23:59:29
  return futureDate;
};
