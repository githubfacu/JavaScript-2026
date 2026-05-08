const { ask, rl } = require('../utils/readline');

async function power() {
  const num = await ask('Introduce el numerador de la fracción: ');
  const den = await ask('Introduce el denominador de la fracción: ');
  const exp = await ask('Introduce un exponente: ');

  console.log(`La fracción ${num}/${den} elevado a ${exp} es la fracción ${den**exp}/${num**exp}`);

  rl.close();
}

async function add() {
  const num1 = await ask('Introduce el numerador de la primera fracción: ');
  const den1 = await ask('Introduce el denominador de la primera fracción: ');
  const num2 = await ask('Introduce el numerador de la segunda fracción: ');
  const den2 = await ask('Introduce el denominador de la segunda fracción: ');

  const den3 = den1 * den2
  const num3 = `${den3/den1*num1+den3/den2*num2}`

  console.log(`La suma de la fracción ${num1}/${den1} y la fracción ${num2}/${den2} es
    ${num3}/${den3}  
  `);

  rl.close();
}

async function substract() {
  const num1 = await ask('Introduce el numerador de la primera fracción: ');
  const den1 = await ask('Introduce el denominador de la primera fracción: ');
  const num2 = await ask('Introduce el numerador de la segunda fracción: ');
  const den2 = await ask('Introduce el denominador de la segunda fracción: ');

  const den3 = den1 * den2
  const num3 = `${den3/den1*num1-den3/den2*num2}`

  console.log(`La resta de la fracción ${num1}/${den1} y la fracción ${num2}/${den2} es
    ${num3}/${den3}  
  `);

  rl.close();
}

substract();