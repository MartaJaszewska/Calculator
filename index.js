let number = '';
let expressionArray = [];
let parenthesesArray = [];
let operator = ''; // when some operator is clicked this variable is used to store the sign of operation
let isOperatorClicked = false; // returns true when an operator was clicked at least once in the expression
let isEqualsClicked = false; // returns true when an equals was clicked at least once in the expression
let isNumClicked = false; // returns true when some number was clicked at least once in the expression
let isParenthesisClicked = false;
const expression = document.getElementById('expression');
const result = document.getElementById('result');
const clear = document.getElementById('btn-clear'); // 'C' button
const clearEntry = document.getElementById('btn-clearEntry'); // 'CE' button
const decimal = document.getElementById('btn-decimal'); // '.' button
const equals = document.getElementById('btn-equals'); // '=' button
const parentheses = document.querySelectorAll('.btn-parenthesis');
const buttons = document.querySelectorAll('.btn');
const numbers = document.querySelectorAll('.btn-number'); // 1-9 buttons
const operators = document.querySelectorAll('.btn-operator'); // '+','-', '×', '÷' buttons
const mathOperators = ['+', '-', '×', '÷', '√', '^'];
const doubleOperators = [];

for (let i = 0; i < mathOperators.length; i += 1) {
  if (mathOperators[i] !== '+' && mathOperators[i] !== '-') {
    doubleOperators.push(`(${mathOperators[i]}`);
  }
  for (let j = 5; j >= 0; j -= 1) {
    doubleOperators.push(`${mathOperators[i]}${mathOperators[j]}`);
  }
}

// helper functions

const expressionArrayAdjust = arr => {
  return arr.map(i => {
    if (i === '×') {
      return '*';
    } else if (i === '÷') {
      return '/';
    }
    return i;
  });
};

const powerAdjust = (arr, powerIndex) => {
  let base;
  let power;
  // searching for a base
  if (arr[powerIndex - 1] === ')') {
    const parenthesisIndex = powerIndex - 1;
    let count = 0;
    base = [];
    for (let i = parenthesisIndex; i >= 0; i -= 1) {
      if (arr[i] === ')') {
        base.unshift(arr[i]);
        arr.splice(i, 1);
        powerIndex -= 1;
        count += 1;
      } else if (arr[i] === '(') {
        base.unshift(arr[i]);
        arr.splice(i, 1);
        powerIndex -= 1;
        count -= 1;
      } else {
        base.unshift(arr[i]);
        arr.splice(i, 1);
        powerIndex -= 1;
      }
      if (count === 0) {
        break;
      }
    }
  } else {
    base = [arr[powerIndex - 1]];
    arr.splice(powerIndex - 1, 1);
    powerIndex -= 1;
  }
  // searching for a power
  if (arr[powerIndex + 1] === '(') {
    const parenthesisIndex = powerIndex + 1;
    let count = 0;
    power = [];
    for (let i = parenthesisIndex; i < arr.length; i += 1) {
      if (arr[i] === '(') {
        power.push(arr[i]);
        arr.splice(i, 1);
        i -= 1;
        count += 1;
      } else if (arr[i] === ')') {
        power.push(arr[i]);
        arr.splice(i, 1);
        i -= 1;
        count -= 1;
      } else {
        power.push(arr[i]);
        arr.splice(i, 1);
        i -= 1;
      }
      if (count === 0) {
        break;
      }
    }
  } else {
    power = [arr[powerIndex + 1]];
    arr.splice(powerIndex + 1, 1);
  }
  return {
    base,
    power,
    powerIndex
  };
};

const evalAdjust = arr => {
  expressionArray = expressionArrayAdjust(arr);
  for (let i = 0; i < expressionArray.length; i += 1) {
    if (expressionArray[i] === '^') {
      expressionArray.splice(i, 1);
      expressionArray.splice(i, 0, 'Math.pow(');
      const adjust = powerAdjust(expressionArray, i);
      const { base } = adjust;
      const { power } = adjust;
      const { powerIndex } = adjust;
      base.push(',');
      power.push(')');
      expressionArray.splice(powerIndex + 1, 0, ...base.concat(power));
    } else if (expressionArray[i] === '√') {
      expressionArray.splice(i, 1);
      expressionArray.splice(i, 0, 'Math.pow(');
      const adjust = powerAdjust(expressionArray, i);
      const root = adjust.base;
      const { powerIndex } = adjust;
      let num = adjust.power;
      if (eval(num.join('')) < 0 && eval(root.join('')) % 2 !== 0) {
        root.unshift('1', '/');
        root.push(')')
        num = ((Math.abs(eval(num.join('')))).toString() + ',').split('')
        expressionArray.splice(powerIndex + 1, 0, ...num.concat(root));
        expressionArray.splice(powerIndex, 0, '-1*');
      } else if (eval(num.join('')) === 0 || eval(num.join('')) < 0 && eval(root.join('')) % 2 === 0 || eval(root.join('')) === 0) {
        result.value = 'Roots error';
        number = '';
        operator = '';
        expressionArray = [];
        parenthesesArray = [];
        isOperatorClicked = false;
        isEqualsClicked = true;
        isNumClicked = false;
        isParenthesisClicked = false;
        return;
      } else {
        root.unshift('1', '/');
        root.push(')')
        num.push(',')
        expressionArray.splice(powerIndex + 1, 0, ...num.concat(root));
      }
    }
  }
  return expressionArray;
};

const lastInArray = () => expressionArray[expressionArray.length - 1];

// event handlers

const onClearEntry = () => {
  if (!isEqualsClicked) {
    if (isNumClicked) {
      expression.value = expression.value.slice(0, -1);
      number = number.slice(0, -1);
      if (!number) {
        const last = lastInArray();
        isOperatorClicked = mathOperators.some(operation => operation === last);
        isParenthesisClicked = ['(', ')'].some(parenthesis => parenthesis === last)
        isNumClicked = false;
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
    } else if (isParenthesisClicked) {
      expression.value = expression.value.slice(0, -1);
      const poppedParenthesis = expressionArray.pop()
      if (poppedParenthesis === ')') {
        parenthesesArray.push('(');
      } else if (poppedParenthesis === '(') {
        parenthesesArray.pop();
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
};

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

// event listeners

clearEntry.addEventListener('click', onClearEntry);
clear.addEventListener('click', onClear);
decimal.addEventListener('click', onDecimal);
equals.addEventListener('click', onEquals);
equals.addEventListener('click', () => {
  // rounds the result to the set number of decimal places
  if (result.value.indexOf('.') !== -1) {
    const dotIndex = result.value.indexOf('.');
    const int = result.value.slice(0, dotIndex);
    const fix = 16 - int.length;
    result.value = parseFloat(parseFloat(result.value).toFixed(fix));
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
  return button.addEventListener('click', () => {
    // changes the font size depending on the length of the expression
    if (expression.value.length < 10) expression.style.fontSize = '50px';
    else if (expression.value.length < 12) expression.style.fontSize = '40px';
    else if (expression.value.length < 14) expression.style.fontSize = '35px';
    else if (expression.value.length < 17) expression.style.fontSize = '30px';
    else if (expression.value.length < 20) expression.style.fontSize = '25px';
    else if (expression.value.length < 25) expression.style.fontSize = '20px';
    else expression.style.fontSize = '18px';
  });
});

Array.from(buttons).map(button => {
  return button.addEventListener('click', () => {
    if (doubleOperators.some(doubleOperator => expression.value.includes(doubleOperator))) {
      result.value = 'Error double operator';
    }
  });
});