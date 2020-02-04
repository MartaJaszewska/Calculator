/* eslint-disable no-undef */
const url = 'http://api.nbp.pl/api/exchangerates/tables/a/';
const rates = async () => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Data fetch error', error);
  }
}

rates()
  .then(table => table[0].rates)
  .then(rates => {
    const dropdownMenu = document.querySelector('#dropdown-menu');
    let htmlCode = '';
    rates.forEach(rate => {
      htmlCode += `<li class="dropdown-item" href="#">${rate.currency}</li>`
    })
    dropdownMenu.innerHTML = `${htmlCode}`;
    const currencies = document.querySelectorAll('.dropdown-item');
    Array.from(currencies).map(currency => {
      return currency.addEventListener('click', () => {
        rates.map(rate => {
          if (rate.currency === currency.innerHTML && isNumClicked === false && lastInArray !== ')') {
            expression.value += rate.code;
            expression.value += '(';
            isParenthesisClicked = true;
            exchange = rate.mid;
            expressionArray.push(`${rate.mid}`, '×', '(')
            parenthesesArray.push('(')
            font();
          }
        })
      })
    });
  })