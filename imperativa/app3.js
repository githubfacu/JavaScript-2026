const { ask, rl } = require('../utils/readline');

async function interval() {
  const min = await ask('Introduce el mínimo del intervalo: ');
  const max = await ask('Introduce el máximo del intervalo (superior o igual al mínimo): ');

  console.log(`La longitud del intervalo [${min},${max}] es ${max-min}`);

  rl.close();
}

async function interval_includes() {
  const min = await ask('Introduce el mínimo del intervalo: ');
  const max = await ask('Introduce el máximo del intervalo (superior o igual al mínimo): ');
  const point = await ask('Introduce un punto: ');

  const isPointInclude = +min<=+point && +point<=+max ? 'si' : 'no'

  console.log(`El intervalo [${min},${max}] ${isPointInclude} incluye el point ${point}`);

  rl.close();
}

async function interval_split() {
  const min = await ask('Introduce el mínimo del intervalo: ');
  const max = await ask('Introduce el máximo del intervalo (superior o igual al mínimo): ');
  const parts = await ask('Introduce cantidad de intervalos: ');

  const parsed = {
    'min': +min,
    'max': +max,
    'parts': +parts
  }

  const intervalLength = parsed.max - parsed.min;
  const partLong = intervalLength / parsed.parts;

  const firstInterval = `[${parsed.min}, ${parsed.min + partLong}]`;
  console.log(firstInterval);

  console.log(`El intervalo [${min},${max}] dividido en ${parts} son ${firstInterval}`);

  rl.close();
}

interval_split()