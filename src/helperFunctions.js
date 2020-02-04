/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

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
  // searching for a base/root of a number
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
  // searching for a power/number
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

const font = () => {
  // changes the font size depending on the length of the expression
  if (expression.value.length < 10) expression.style.fontSize = '50px';
  else if (expression.value.length < 12) expression.style.fontSize = '40px';
  else if (expression.value.length < 14) expression.style.fontSize = '35px';
  else if (expression.value.length < 17) expression.style.fontSize = '30px';
  else if (expression.value.length < 20) expression.style.fontSize = '25px';
  else if (expression.value.length < 25) expression.style.fontSize = '20px';
  else expression.style.fontSize = '18px';
}