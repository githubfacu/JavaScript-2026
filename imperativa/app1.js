const { ask, rl } = require('../utils/readline');

async function fraction_inverse_0() {
  const num = await ask('Introduce el numerador de la fracción: ');
  const den = await ask('Introduce el denominador de la fracción: ');

  console.log(`La fracción ${num}/${den} invertida es la fracción ${den}/${num}`);

  rl.close();
}

fraction_inverse_0()

async function fraction_inverse_1() {
  const num = await ask('Introduce el numerador de la fracción: ');
  const den = await ask('Introduce el denominador de la fracción: ');

  const gcd = (a, b) =>{
    if (a == b)
      return a;
    else if (a>b)
      return gcd(a-b, b);
    else
      return gcd(a, b-a);
  }

  const divisor = gcd(num, den);

  const simplifiedNum = num / divisor;
  const simplifiedDen = den / divisor;

  console.log(`La fracción ${simplifiedNum}/${simplifiedDen} invertida es la fracción ${simplifiedDen}/${simplifiedNum}`);

  rl.close();
}
