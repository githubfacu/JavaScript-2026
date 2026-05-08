const { ask, rl } = require('../../utils/readline');

async function binarySearch() {
  const num = await ask('Introduce un núnero entre 0 y 1.000.000: ');

  const numInt = +num
  let response = ''
  let base = 0
  let top = 1000000
  let numberToAsk = 500000

  do {
    response = await ask(`¿es menor, igual o mayor que ${ numberToAsk }?`)
    if (response == 'mayor') {
        base = numberToAsk+1
        const newNumberToAsk = (top + base) / 2
        if (newNumberToAsk%2 === 0 || newNumberToAsk%2 === 1) {
            numberToAsk = newNumberToAsk
        } else{
            numberToAsk = (top + numberToAsk) / 2
        }
    }
    if (response == 'menor') {
        top = numberToAsk-1
        const newNumberToAsk = (top + base) / 2
        if (newNumberToAsk%2 === 0 || newNumberToAsk%2 === 1) {
            numberToAsk = newNumberToAsk
        }
        else {
            numberToAsk = (base + numberToAsk) / 2
        } 
    }
  } while (response != 'igual');

  console.log(`El número es: ${numberToAsk}`);

  rl.close();
}

binarySearch()