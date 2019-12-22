for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => font(input))}

  const reg = new RegExp(/([0-9\.])$/);
  const text = '111.'
  console.log(reg.test(text))

  input.addEventListener("keyup", function(event) {
    event.preventDefault();
    const keysCodes = [107, 173, 106, 111, 46, 8, 190, 13]
    const buttons = ['btn-addition', 'btn-subtraction', 'btn-multiplication', 'btn-division', 'btn-clear', 'btn-clearEntry', 'btn-decimal', 'btn-equals']

    keysCodes.map(code => {
      const i = keysCodes.indexOf(code);
      if (event.keyCode === code) document.getElementById(buttons[i]).click()
    })
  });

// for (let i = 0; i < numbers.length; i++) {
//   numbers[i].addEventListener('click', () => {
//     if (input.value === 'error') return;
//     if (isOperatorClicked) {
//       number1 = parseFloat(input.value);
//       input.value = '';
//     }
//     if (input.value === '0') {
//       input.value = numbers[i].innerText;
//       isOperatorClicked = false;
//       isEqualsClicked = false;
//     } else if (isEqualsClicked === false || isOperatorClicked === true) {
//       input.value += numbers[i].innerText;
//       font(input);
//       isOperatorClicked = false;
//       isEqualsClicked = false;
// }})}
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', () => {
    if (input.value === 'error') return;
    if (!operator) {
      number1 = parseFloat(input.value);
      operator = operators[i].innerText;
      isOperatorClicked = true;
    } else {
      number2 = parseFloat(input.value);
      if (divisionError(operator, number2, input)) return;
      else {
        input.value = calculate(operator, number1, number2);
        font(input);
        operator = operators[i].innerText;
        number2 = parseFloat(input.value);
        isOperatorClicked = true;
}}})}