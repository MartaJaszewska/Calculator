let expression = '';

const getData = data => {
  expression = expression + data;
  document.getElementById('input').value = expression;
};

const clearInput = () => {
  expression = '';
  document.getElementById('input').value = expression;
}

