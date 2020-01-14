/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const onClear = () => {
  expression.value = '';
  result.value = 0;
  number = '';
  operator = '';
  expressionArray = [];
  parenthesesArray = [];
  isOperatorClicked = false;
  isEqualsClicked = false;
  isNumClicked = false;
  isParenthesisClicked = false;
};

const onClearEntry = () => {
  if (!isEqualsClicked) {
    if (isNumClicked) {
      expression.value = expression.value.slice(0, -1);
      number = number.slice(0, -1);
      if (!number) {
        isNumClicked = false;
        const last = lastInArray();
        isOperatorClicked = mathOperators.some(operation => operation === last);
        isParenthesisClicked = ['(', ')'].some(parenthesis => parenthesis === last)
      }
    } else if (isOperatorClicked) {
      expression.value = expression.value.slice(0, -1);
      expressionArray.pop()
      operator = '';
      const last = lastInArray();
      isOperatorClicked = mathOperators.some(operation => operation === last);
      isParenthesisClicked = ['(', ')'].some(parenthesis => parenthesis === last);
      if (!isParenthesisClicked) {
        number = expressionArray.pop();
        isNumClicked = true;
      }
    } 
    else if (isParenthesisClicked) {
      expression.value = expression.value.slice(0, -1);
      const poppedParenthesis = expressionArray.pop()
      if (poppedParenthesis === ')') {
        parenthesesArray.push('(');
      } else if (poppedParenthesis === '(') {
        parenthesesArray.pop();
      }
      if (expression.value[expression.value.length - 2].match(/[a-z]/i)) {
          expression.value = expression.value.slice(0, -3);
          expressionArray.pop();
          expressionArray.pop();
      }
      let last = lastInArray();
      if (last === '^' || last === '√') {
        expression.value = expression.value.slice(0, -1);
        expressionArray.pop()
        last = lastInArray();
      }
      isOperatorClicked = mathOperators.some(operation => operation === last);
      isParenthesisClicked = ['(', ')'].some(parenthesis => parenthesis === last);
      if (isOperatorClicked) {
        operator = last;
      } else if (!(isOperatorClicked || isParenthesisClicked)) {
        number = expressionArray.pop();
        isNumClicked = true;
      }
    }
  }
  if (!expression.value) {
    onClear()
  }
};

const onDecimal = () => {
  if (number && number.indexOf('.') === -1 && expression.value !== 'error' && !isEqualsClicked) {
    expression.value += '.';
    number += '.';
  }
};

const onEquals = () => {
  if (parenthesesArray.length !== 0) {
    result.value = 'Parentheses error';
  } else if (isOperatorClicked) {
    result.value = 'Operator error';
  } else if (isNumClicked) {
    expressionArray.push(number);
    result.value = 0;
    result.value = eval(evalAdjust(expressionArray).join(''));
    number = '';
    isOperatorClicked = false;
    isNumClicked = false;
    isParenthesisClicked = false;
    isEqualsClicked = true;
    expressionArray = [];
    if (result.value === 'Infinity') {
      result.value = 'Division error';
      isEqualsClicked = true;
    }
  } else if (parenthesesArray.length === 0 && lastInArray() === ')') {
    result.value = 0;
    result.value = eval(evalAdjust(expressionArray).join(''));
    isOperatorClicked = false;
    isNumClicked = false;
    isParenthesisClicked = false;
    isEqualsClicked = true;
    expressionArray = [];
  }
};