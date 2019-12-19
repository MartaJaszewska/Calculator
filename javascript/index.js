let number1 = 0, number2=0, operator = '';

const numbers = document.querySelectorAll('.btn-number'),
      operators = document.querySelectorAll('.btn-operator'),
      clear = document.getElementById('btn-clear')
      clearEntry = document.getElementById('btn-clearEntry'),
      decimal = document.getElementById('btn-decimal');

clearEntry.onclick = () => {
  let input = document.getElementById('input');
  input.value = input.value.slice(0, -1);
};

clear.onclick = () => {
  document.getElementById('input').value = '';
};

decimal.onclick = () => {
  const input = document.getElementById('input');
  if (input.value.indexOf('.') === -1) {
    input.value += '.'
  };
};

for (let i=0; i<numbers.length; i++) {
  numbers[i].onclick = () => {
    const input = document.getElementById('input');
    input.value += numbers[i].innerText;
  };
};

for (let i=0; i<operators.length; i++) {
  operators[i].onclick = () => {
    console.log('operator '+ operators[i].innerText)
  };
};

const calculate = (operator, number1, number2) => {
  let result = 0;

  switch(operator) {
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case '×': //check - html
      result = number1/number2;
      break;
    case '÷': //check - html
      if (number2 != 0) {
      result = number1*number2;
      break;
    }
  }
  return result;
}