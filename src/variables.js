/* eslint-disable no-unused-vars */

const expression = document.getElementById('expression'); //math expression field
const result = document.getElementById('result'); // result field
const clear = document.getElementById('btn-clear'); // 'C' button
const clearEntry = document.getElementById('btn-clearEntry'); // 'CE' button
const decimal = document.getElementById('btn-decimal'); // '.' button
const equals = document.getElementById('btn-equals'); // '=' button
const parentheses = document.querySelectorAll('.btn-parenthesis');
const buttons = document.querySelectorAll('.btn');
const numbers = document.querySelectorAll('.btn-number'); // 1-9 buttons
const operators = document.querySelectorAll('.btn-operator'); // '+','-', '×', '÷' buttons
const mathOperators = ['+', '-', '×', '÷', '√', '^'];
const doubleOperators = []; // this variable is used to store not allowed pairs of operators and parentheses
for (let i = 0; i < mathOperators.length; i += 1) {
  if (mathOperators[i] !== '+' && mathOperators[i] !== '-') {
    doubleOperators.push(`(${mathOperators[i]}`);
  }
  for (let j = 5; j >= 0; j -= 1) {
    doubleOperators.push(`${mathOperators[i]}${mathOperators[j]}`);
  }
}
let number = ''; // every single number used in math expression
let exchange = 1; // initial value of 1PLN
let expressionArray = []; // math expression in array
let parenthesesArray = []; // checks parenthesis matching
let operator = ''; // when some operator is clicked this variable is used to store the sign of operation
let isOperatorClicked = false; // returns true when an operator was clicked
let isEqualsClicked = false; // returns true when an equals was clicked
let isNumClicked = false; // returns true when some number was clicked
let isParenthesisClicked = false; // returns true when an parenthesis was clicked