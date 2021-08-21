const clip = require('clipboardy').writeSync;

if (!process.argv[2] || !process.argv[3] || !process.argv[4])
  console.log(
    '\n\nUsage\nnode math.js [Math Operator] [At Least TWO Numbers]\n\n'
  );
else {
  const answer = main(process.argv[2], process.argv.slice(3));
  clip(answer.toString());
  console.log(answer);
}

function main(operator, numbers) {
  switch (operator) {
    case 'x':
      operator = '*';
      break;
    case '÷':
      operator = '/';
      break;
  }
  let equations, answer;
  equations = numbers.join(operator);

  try {
    answer = eval(equations);
  } catch (e) {
    answer = e;
  }

  return answer;
}
