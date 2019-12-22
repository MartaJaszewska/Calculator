let number1 = 0,
    number2 = 0,
    operator = '',
    isOperatorClicked = false, // returns true when an operator was clicked at least once in the expression
    isEqualsClicked = false, // returns true when an equals was clicked at least once in the expression
    isNumClicked = false, //when the '=' is clicked again this variable is used to repeat the previous operation
    equalsAgain = ''; //when the '=' is clicked again this variable is used to repeat the previous operation

const numbers = document.querySelectorAll('.btn-number'), // 1-9 buttons
      operators = document.querySelectorAll('.btn-operator'), // '+','-', '×', '÷' buttons
      clear = document.getElementById('btn-clear'), // 'C' button
      clearEntry = document.getElementById('btn-clearEntry'), // 'CE' button
      opposite = document.getElementById('btn-opposite'), // '+/-' button
      decimal = document.getElementById('btn-decimal'), // '.' button
      equals = document.getElementById('btn-equals'), // '=' button
      input = document.getElementById('input');

const onClearEntry = () => {
  if (input.value !== 'error' && !isEqualsClicked && !isOperatorClicked) {
    input.value = input.value.slice(0, -1);
    font(input);
}};

const onClear = () => {
  input.value = '0';
  font(input);
  number1 = 0;
  number2 = 0;
  operator = '';
  isOperatorClicked = false;
  isEqualsClicked = false;
  isNumClicked = false;
};

const onOpposite = () => {
  if (input.value === 'error') return;
  input.value = -1 * input.value;
  font(input);
};

const onDecimal = () => {
  if (input.value.indexOf('.') === -1 && input.value !== 'error' && !isEqualsClicked) {
    input.value += '.';
    font(input);
}};

const onEquals = () => {
  if (input.value === 'error') return;
  if (operator && !isEqualsClicked) {
    number2 = parseFloat(input.value);
    if (divisionError(operator, number2, input)) return;
    input.value = calculate(operator, number1, number2);
    round(input);
    font(input);
    equalsAgain = operator;
    operator = '';
    isOperatorClicked = false;
    isEqualsClicked = true;
  } else if (!operator && isEqualsClicked) {
    input.value = calculate(equalsAgain, parseFloat(input.value), number2);
    round(input);
    font(input);
}};

const font = (input) => { // changes the font size depending on the length of the expression
  round(input);
  if (input.value.length < 7) input.style.fontSize = '60px';
  else if (input.value.length < 9) input.style.fontSize = '50px';
  else if (input.value.length < 11) input.style.fontSize = '40px';
  else if (input.value.length < 13) input.style.fontSize = '30px';
  else if (input.value.length < 15) input.style.fontSize = '25px';
  else if (input.value.length < 17) input.style.fontSize = '20px';
  else if (input.value.length < 19) input.style.fontSize = '15px';
  else if (input.value.length >= 19) {
    input.value = 'error';
    console.error('Maximum expression length has been reached.')
}};

const round = (input) => { // rounds the result to the set number of decimal places
  if (input.value.includes('.')) input.value = parseFloat(input.value).toFixed(2);
};

const calculate = (operator, number1, number2) => { // math operations
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

const divisionError = (operator, number2, input) => { // insurance division by zero
  if (operator === '÷' && number2 === 0) {
    input.value = 'error';
    console.error('Division by 0 is undefined.');
    return true;
}};

clearEntry.addEventListener('click', onClearEntry);
clear.addEventListener('click', onClear);
opposite.addEventListener('click', onOpposite);
decimal.addEventListener('click', onDecimal);
equals.addEventListener('click', onEquals);

Array.from(numbers).map((num) => {
  num.addEventListener('click', () => {
    if (input.value === 'error') return;
    if (isOperatorClicked) {
      number1 = parseFloat(input.value);
      input.value = '';
      isNumClicked = true
    }
    if (input.value === '0') {
      input.value = num.innerText;
      isOperatorClicked = false;
      isEqualsClicked = false;
      isNumClicked = true
    } else if (!isEqualsClicked || isOperatorClicked) {
      input.value += num.innerText;
      font(input);
      isOperatorClicked = false;
      isEqualsClicked = false;
      isNumClicked = true
}})});

Array.from(operators).map((operation) => {
  operation.addEventListener('click', () => {
    if (input.value === 'error') return;
    if (!operator) {
      number1 = parseFloat(input.value);
      operator = operation.innerText;
      isOperatorClicked = true;
    } else if (isNumClicked) {
      number2 = parseFloat(input.value);
      if (divisionError(operator, number2, input)) return;
      input.value = calculate(operator, number1, number2);
      font(input);
      operator = operation.innerText;
      number2 = parseFloat(input.value);
      isOperatorClicked = true;
      isNumClicked = false
    } else {operator = operation.innerText;
}})});
