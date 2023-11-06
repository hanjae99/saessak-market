const priceComma = function comma(no) {
  no += "";
  let commaNo = Math.floor((no.length - 1) / 3);
  for (let i = 0; i < commaNo; i++) {
    no =
      no.substring(0, no.length - 3 - 4 * i) +
      "," +
      no.substring(no.length - 3 - 4 * i);
  }
  return no;
};
export default priceComma;
