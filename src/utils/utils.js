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

module.exports.isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;

  const validEmailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const isValid = validEmailRegex.test(email);

  return isValid;
};

module.exports.deletePageCookies = () => {
  document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, (name) =>
    window.location.hostname
      .split(/\.(?=[^\.]+\.)/)
      .reduceRight(
        (acc, val, i, arr) =>
          i ? (arr[i] = "." + val + acc) : ((arr[i] = ""), arr),
        ""
      )
      .map(
        (domain) =>
          (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`)
      )
  );
};
