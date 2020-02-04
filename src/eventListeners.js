/* eslint-disable no-undef */

clearEntry.addEventListener('click', onClearEntry);

clear.addEventListener('click', onClear);

decimal.addEventListener('click', onDecimal);

equals.addEventListener('click', onEquals);

equals.addEventListener('click', () => {
  if (result.value.indexOf('.') !== -1) {
    // 1. option:  rounds the result to fit in result field
    // const dotIndex = result.value.indexOf('.');
    // const int = result.value.slice(0, dotIndex);
    // const fix = 16 - int.length;
    // result.value = parseFloat(parseFloat(result.value).toFixed(fix));
    // 2. option: rounds the result to the set number of decimal places
    result.value = parseFloat(parseFloat(result.value).toFixed(2));
  }
});

Array.from(numbers).map(num => {
  return num.addEventListener('click', () => {
    if (isEqualsClicked) {
      expression.value = '';
      operator = '';
      expressionArray = [];
      parenthesesArray = [];
      isEqualsClicked = false;
    }
    if (isParenthesisClicked && lastInArray() === ')') {
      return;
    }
    isNumClicked = true;
    isOperatorClicked = false;
    isEqualsClicked = false;
    isParenthesisClicked = false;
    if (expression.value === '' || isEqualsClicked) {
      expression.value = num.innerText;
      number = num.innerText;
    } else if (!isEqualsClicked || isOperatorClicked || expression.value === '-') {
      expression.value += num.innerText;
      number += num.innerText;
    }
  });
});

Array.from(operators).map(operation => {
  return operation.addEventListener('click', () => {
    if (isEqualsClicked) {
      expression.value = result.value;
      number = result.value;
      expressionArray = [];
      expressionArray.push(number)
      parenthesesArray = [];
      number = '';
      operator = operation.innerText;
      expression.value += operator;
      expressionArray.push(operator);
      isOperatorClicked = true;
      isNumClicked = false;
      isParenthesisClicked = false;
      isEqualsClicked = false;
      if (operator === '^' || operator === '√') {
        expression.value += '(';
        parenthesesArray.push('(');
        expressionArray.push('(');
        isOperatorClicked = false;
        isParenthesisClicked = true;
      }
    } else if (isParenthesisClicked) {
      if (lastInArray() !== ')' && isNumClicked) {
        expressionArray.push(number);
        number = '';
        operator = operation.innerText;
        expression.value += operator;
        expressionArray.push(operator);
        isOperatorClicked = true;
        isNumClicked = false;
        isParenthesisClicked = false;
        isEqualsClicked = false;
      } else if (
        (lastInArray() === '(' || isEqualsClicked) &&
        (operation.innerText === '×' || operation.innerText === '÷')
      ) {
        return;
      } else {
        number = '';
        operator = operation.innerText;
        expression.value += operator;
        expressionArray.push(operator);
        isOperatorClicked = true;
        isNumClicked = false;
        isParenthesisClicked = false;
        isEqualsClicked = false;
        if (operator === '^' || operator === '√') {
          expression.value += '(';
          parenthesesArray.push('(');
          expressionArray.push('(');
          isOperatorClicked = false;
          isParenthesisClicked = true;
        }
      }
    } else if (!isOperatorClicked && isNumClicked) {
      expressionArray.push(number);
      number = '';
      operator = operation.innerText;
      expression.value += operator;
      expressionArray.push(operator);
      isOperatorClicked = true;
      isNumClicked = false;
      isParenthesisClicked = false;
      isEqualsClicked = false;
      if (operator === '^' || operator === '√') {
        expression.value += '(';
        parenthesesArray.push('(');
        expressionArray.push('(');
        isOperatorClicked = false;
        isParenthesisClicked = true;
      }
    } else if (operation.innerText === '-' && expressionArray.length === 0 && result.value !== 'Division error') {
      operator = operation.innerText;
      expression.value = operator;
      expressionArray.push(operator);
      isOperatorClicked = true;
      isEqualsClicked = false;
      isNumClicked = false;
      isParenthesisClicked = false;
    } else if (expressionArray.length > 1) {
      operator = operation.innerText;
      expression.value = expression.value.replace(/.$/, operator);
      expressionArray.pop();
      expressionArray.push(operator);
    } else if (isOperatorClicked && expressionArray.length <= 1 && (operation.innerText === '+' || operation.innerText === '-')) {
      operator = operation.innerText;
      expression.value = expression.value.replace(/.$/, operator);
      expressionArray.pop();
      expressionArray.push(operator);
    }
  });
});

Array.from(parentheses).map(parenthesis => {
  return parenthesis.addEventListener('click', () => {
    if (isEqualsClicked) {
      expression.value = '';
      operator = '';
      expressionArray = [];
      parenthesesArray = [];
      isEqualsClicked = false;
    }
    if (((!isNumClicked && isOperatorClicked) || lastInArray() === '(' || expression.value === '') && parenthesis.innerText === '(') {
      expression.value += parenthesis.innerText;
      expressionArray.push(parenthesis.innerText);
      parenthesesArray.push('(');
      isParenthesisClicked = true;
      isOperatorClicked = false;
      isNumClicked = false;
      number = '';
    } else if (isNumClicked && !isOperatorClicked && parenthesis.innerText === ')') {
      expression.value += parenthesis.innerText;
      expressionArray.push(number);
      number = '';
      expressionArray.push(parenthesis.innerText);
      parenthesesArray.pop('(');
      isParenthesisClicked = true;
      isOperatorClicked = false;
      isNumClicked = false;
    } else if (lastInArray() === ')' && parenthesesArray.length !== 0) {
      expression.value += parenthesis.innerText;
      expressionArray.push(parenthesis.innerText);
      parenthesesArray.pop('(');
      isParenthesisClicked = true;
      isOperatorClicked = false;
      isNumClicked = false;
    }
  });
});

Array.from(buttons).map(button => {
  return button.addEventListener('click', font);
});

Array.from(buttons).map(button => {
  return button.addEventListener('click', () => {
    if (doubleOperators.some(doubleOperator => expression.value.includes(doubleOperator))) {
      result.value = 'Error';
    }
  });
});