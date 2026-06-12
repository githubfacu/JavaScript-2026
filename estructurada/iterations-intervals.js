import { ask, rl } from "../utils/readline.js";

async function intervalSplit() {
  const MIN = await ask('Dame el mínimo: ');
  const MAX = await ask('Dame el máximo: ');
  const PARTS = await ask('Dame el número de partes: ');

  const MIN_INT = +MIN
  const MAX_INT = +MAX
  const PARTS_INT = +PARTS

  const INTERVAL_LONG = (MAX_INT - MIN_INT) / PARTS_INT;
  let initialValue = MIN_INT
  
  for (let index = 0; index < PARTS_INT; index++) {
    const INTERVAL_END_VALUE = initialValue+INTERVAL_LONG
    console.log(`[${ initialValue }, ${ INTERVAL_END_VALUE }]`);
    initialValue=INTERVAL_END_VALUE
  }

  rl.close();
}

intervalSplit()