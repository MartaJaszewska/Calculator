let number1 = 0,
    number2 = 0,
    operator = '', // when some operator is clicked this variable is used to store the sign of operation
    isOperatorClicked = false, // returns true when an operator was clicked at least once in the expression
    isEqualsClicked = false, // returns true when an equals was clicked at least once in the expression
    isNumClicked = false, // returns true when some number was clicked at least once in the expression
    equalsAgain = ''; // when the '=' is clicked again this variable is used to repeat the previous operation

const numbers = document.querySelectorAll('.btn-number'), // 1-9 buttons
      operators = document.querySelectorAll('.btn-operator'), // '+','-', '×', '÷' buttons
      clear = document.getElementById('btn-clear'), // 'C' button
      clearEntry = document.getElementById('btn-clearEntry'), // 'CE' button
      opposite = document.getElementById('btn-opposite'), // '+/-' button
      decimal = document.getElementById('btn-decimal'), // '.' button
      equals = document.getElementById('btn-equals'), // '=' button
      expression = document.getElementById('expression'),
      result = document.getElementById('result');

// event handlers
const onClearEntry = () => {
  if (result.value !== 'error' && !isEqualsClicked && !isOperatorClicked) {
    result.value = result.value.slice(0, -1);
    font(result);
}};

const onClear = () => {
  result.value = '0';
  font(result);
  number1 = 0;
  number2 = 0;
  operator = '';
  isOperatorClicked = false;
  isEqualsClicked = false;
  isNumClicked = false;
};

const onOpposite = () => {
  if (result.value === 'error') return;
  result.value = -1 * result.value;
  font(result);
};

const onDecimal = () => {
  if (result.value.indexOf('.') === -1 && result.value !== 'error' && !isEqualsClicked) {
    result.value += '.';
}};

const onEquals = () => {
  if (result.value === 'error') return;
  if (operator && !isEqualsClicked) {
    number2 = parseFloat(result.value);
    if (divisionError(operator, number2, result)) return;
    result.value = calculate(operator, number1, number2);
    round(result);
    font(result);
    equalsAgain = operator;
    operator = '';
    isOperatorClicked = false;
    isEqualsClicked = true;
  } else if (!operator && isEqualsClicked) {
    result.value = calculate(equalsAgain, parseFloat(result.value), number2);
    round(result);
    font(result);
}};

// const onPower = () => {

// }

// helper functions
const font = (input) => { // changes the font size depending on the length of the expression
  if (input.value.length < 9) input.style.fontSize = '50px';
  else if (input.value.length < 12) input.style.fontSize = '40px';
  else if (input.value.length < 14) input.style.fontSize = '35px';
  else if (input.value.length < 16) input.style.fontSize = '30px';
  else if (input.value.length < 18) input.style.fontSize = '25px';
  else if (input.value.length < 22) input.style.fontSize = '20px';
  else input.style.fontSize = '15px';
};

const round = (input) => { // rounds the result to the set number of decimal places
  if (input.value.indexOf('.') !== -1) {
    const dotIndex = input.value.indexOf('.');
    const int = input.value.slice(0, dotIndex);
    const fix = 16 - int.length;
    input.value = parseFloat(parseFloat(input.value).toFixed(fix));
}};

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
    case '√':
      result = Math.pow(number1, 1/number2)
      break;
    case 'xy':
      result = Math.pow(number1, number2)
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

// event listeners
clearEntry.addEventListener('click', onClearEntry);
clear.addEventListener('click', onClear);
opposite.addEventListener('click', onOpposite);
decimal.addEventListener('click', onDecimal);
equals.addEventListener('click', onEquals);

Array.from(numbers).map((num) => {
  num.addEventListener('click', () => {
    if (result.value === 'error') return;
    if (isOperatorClicked) {
      number1 = parseFloat(result.value);
      result.value = '';
      isNumClicked = true
    }
    if (result.value === '0') {
      result.value = num.innerText;
      isOperatorClicked = false;
      isEqualsClicked = false;
      isNumClicked = true
    } else if (!isEqualsClicked || isOperatorClicked) {
      result.value += num.innerText;
      font(result);
      isOperatorClicked = false;
      isEqualsClicked = false;
      isNumClicked = true
}})});

Array.from(operators).map((operation) => {
  operation.addEventListener('click', () => {
    if (result.value === 'error') return;
    if (!operator) {
      number1 = parseFloat(result.value);
      operator = operation.innerText;
      isOperatorClicked = true;
    } else if (isNumClicked) {
      number2 = parseFloat(result.value);
      if (divisionError(operator, number2, result)) return;
      result.value = calculate(operator, number1, number2);
      round(result);
      font(result);
      operator = operation.innerText;
      number2 = parseFloat(result.value);
      isOperatorClicked = true;
      isNumClicked = false
    } else {operator = operation.innerText;
}})});
