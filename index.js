let number1 = 0,
    number2 = 0,
    operator = '',
    isOperatorClicked = false,
    equalAgain = '';

const numbers = document.querySelectorAll('.btn-number'),
      operators = document.querySelectorAll('.btn-operator'),
      clear = document.getElementById('btn-clear'),
      clearEntry = document.getElementById('btn-clearEntry'),
      decimal = document.getElementById('btn-decimal'),
      equal = document.getElementById('btn-equal'),
      input = document.getElementById('input');

clearEntry.onclick = () => {
  input.value = input.value.slice(0, -1);
};

clear.onclick = () => {
  input.value = '0';
  number1 = 0;
  number2 = 0;
  operator = '';
  isOperatorClicked = false;
};

decimal.onclick = () => {
  if (input.value.indexOf('.') === -1) input.value += '.';
};

equal.onclick = () => {
  if (operator) {
    number2 = parseFloat(input.value);
    input.value = calculate(operator, number1, number2);
    equalAgain = operator;
    operator = '';
    isOperatorClicked = false;
  } else {
    input.value = calculate(equalAgain, parseFloat(input.value), number2);
  }
};

for (let i = 0; i < numbers.length; i++) {
  numbers[i].onclick = () => {
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
    if (!operator) {
      number1 = parseFloat(input.value);
      operator = operators[i].innerText;
      isOperatorClicked = true;
    } else {
      number2 = parseFloat(input.value);
      input.value = calculate(operator, number1, number2);
      operator = operators[i].innerText;
      number2 = parseFloat(input.value);
      isOperatorClicked = true;
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
      if (number2 != 0) {
        result = number1 / number2;
        break;
      }
  }
  return result;
};
