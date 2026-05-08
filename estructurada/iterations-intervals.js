const { ask, rl } = require('../utils/readline');

async function intervalSplit() {
  const min = await ask('Dame el mínimo: ');
  const max = await ask('Dame el máximo: ');
  const parts = await ask('Dame el número de partes: ');

  minInt = +min,
  maxInt = +max,
  partsInt = +parts

  const intervalLong = (maxInt - minInt) / partsInt;
  let initialValue = minInt
  
  for (let index = 0; index < partsInt; index++) {
    const intervalEndValue = initialValue+intervalLong
    console.log(`[${ initialValue }, ${ intervalEndValue }]`);
    initialValue=intervalEndValue
  }

  rl.close();
}

intervalSplit()