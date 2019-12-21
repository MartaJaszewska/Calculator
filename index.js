let number1 = 0,
    number2 = 0,
    operator = '',
    isOperatorClicked = false, //true when in expression some operator was clicked at least once
    equalAgain = ''; //when '=' is click again, used to repeat previous operation

const numbers = document.querySelectorAll('.btn-number'), // 1-9 buttons
      operators = document.querySelectorAll('.btn-operator'), // '+','-', '×', '÷' buttons
      clear = document.getElementById('btn-clear'), // 'C' button
      clearEntry = document.getElementById('btn-clearEntry'), // 'CE' button
      opposite = document.getElementById('btn-opposite'), // '+/-' button
      decimal = document.getElementById('btn-decimal'), // '.' button
      equal = document.getElementById('btn-equal'), // '=' button
      input = document.getElementById('input');

clearEntry.onclick = () => {
  if (input.value !== 'error') input.value = input.value.slice(0, -1);
};

clear.onclick = () => {
  input.value = '0';
  number1 = 0;
  number2 = 0;
  operator = '';
  isOperatorClicked = false;
  font();
};

opposite.onclick = () => {
  if (input.value === 'error') return;
  input.value = -input.value;
}

decimal.onclick = () => {
  if (input.value.indexOf('.') === -1 && input.value !== 'error') input.value += '.';
};

equal.onclick = () => {
  font();
  if (input.value === 'error') return;
  if (operator) {
    number2 = parseFloat(input.value);
    if (divisionError()) return;
    else {
      input.value = calculate(operator, number1, number2);
      equalAgain = operator;
      operator = '';
      isOperatorClicked = false;
    }
  } else {
    input.value = calculate(equalAgain, parseFloat(input.value), number2);
  }
};

for (let i = 0; i < numbers.length; i++) {
  numbers[i].onclick = () => {
    font();
    if (input.value === 'error') return;

    if (isOperatorClicked) {
      number1 = parseFloat(input.value);
      input.value = '';
    }
    if (input.value === '0') {
      input.value = numbers[i].innerText;
      isOperatorClicked = false;
    } else {
      input.value += numbers[i].innerText;
      isOperatorClicked = false;
    }
  };
}

for (let i = 0; i < operators.length; i++) {
  operators[i].onclick = () => {
    font();
    if (input.value === 'error') return;
    if (!operator) {
      number1 = parseFloat(input.value);
      operator = operators[i].innerText;
      isOperatorClicked = true;
    } else {
      number2 = parseFloat(input.value);
      if (divisionError()) return;
      else {
        input.value = calculate(operator, number1, number2);
        operator = operators[i].innerText;
        number2 = parseFloat(input.value);
        isOperatorClicked = true;
      }
    }
  };
}

const calculate = (operator, number1, number2) => {
  let result = 0;

  switch (operator) {
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case '×':
      result = number1 * number2;
      break;
    case '÷':
      result = number1 / number2;
      break;
  }
  return result;
};

const divisionError = () => {
  if (operator === '÷' && number2 === 0) {
    input.value = 'error';
    console.error('Division by 0 is undefined.');
    return true;
  }
};

const font = () => {
  if (input.value.length < 6) input.style.fontSize = '60px';
  else if (input.value.length < 8) input.style.fontSize = '50px';
  else if (input.value.length < 10) input.style.fontSize = '40px';
  else if (input.value.length < 12) input.style.fontSize = '30px';
  else if (input.value.length < 14) input.style.fontSize = '20px';
  else if (input.value.length > 20) {
    console.error('Maximum expression length reached.')
    return input.value = 'error'}
}