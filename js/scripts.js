let amount = document.getElementById("myText");
let convertButton = document.getElementById("submit");
let resultArea = document.getElementById("myResult");
let fromSelector = document.getElementById("from");
let toSelector = document.getElementById("to");
document.addEventListener('DOMContentLoaded',convertCurrency, false);


async function callApi(fromcurrency, tocurrency, amount) {
  let currency = fromcurrency+"_"+tocurrency
  let url = 'https://free.currencyconverterapi.com/api/v6/convert?q=' + currency + '&compact=y&apiKey=9a02420c4a5e378f2215';
  let result = await fetch(url);
  let json = await result.json();
  let rate = json[currency]["val"];
  return rate * amount
}

function formatCurrency(type, value) {
  const formatter = new Intl.NumberFormat(type, {
    currency: type,
    style: "currency"
  });
  return formatter.format(value);
}

async function convertCurrency() {
  const from = fromSelector.value;
  const to = toSelector.value;
  value = amount.value.replace(/,/g, '');

  if (Number(value)) {
    const convertedAmount = await (callApi(from, to, value));
    const result = formatCurrency(to, convertedAmount);
    resultArea.value = `${result}`;
    return result;
  }
}

amount.addEventListener('input', convertCurrency)
fromSelector.addEventListener("onChange", convertCurrency);
toSelector.addEventListener("onChange", convertCurrency);
convertButton.addEventListener('click', convertCurrency)
