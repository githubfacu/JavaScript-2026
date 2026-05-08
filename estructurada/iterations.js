const { ask, rl } = require('../utils/readline');

async function seasonWithPart() {
    const day = await ask('Escriba un día (1-30): ');
    const month = await ask('Escriba un mes (1-12): ');
    const year = await ask('Escriba un año (1-...): ');

    let season = 'invierno'
    let temporality = 'primeros'
    const after_21 = +day >= 21

    const monthInt = +month

    if (monthInt === 3 && after_21 || monthInt >= 4) {
        season = 'primavera'
    }
    if (monthInt === 6 && after_21 || monthInt >= 7) {
        season = 'verano'
    }
    if (monthInt === 9 && after_21 || monthInt >= 10) {
        season = 'otoño'
    }
    if (monthInt === 12 && after_21) {
        season = 'invierno'
    }
  
  
    switch (season) {
        case 'invierno':
            if (monthInt === 1 && after_21 || monthInt === 2 && !after_21) {
                temporality = 'mediados'
            }
            if (monthInt === 2 && after_21 || monthInt === 3) {
                temporality = 'finales'
            }
            break;
        case 'primavera':
            if (monthInt === 4 && after_21 || monthInt === 5 && !after_21) {
                temporality = 'mediados'
            }
            if (monthInt === 5 && after_21 || monthInt === 6) {
                temporality = 'finales'
            }
            break;
        case 'verano':
            if (monthInt === 7 && after_21 || monthInt === 8 && !after_21) {
                temporality = 'mediados'
            }
            if (monthInt === 8 && after_21 || monthInt === 9) {
                temporality = 'finales'
            }
            break;
        case 'otoño':
            if (monthInt === 10 && after_21 || monthInt === 11 && !after_21) {
                temporality = 'mediados'
            }
            if (monthInt === 11 && after_21 || monthInt === 12) {
                temporality = 'finales'
            }
        break;
        default:
            temporality = 'primeros'
            break;
    }  

    console.log(`El día ${day} del ${month} de ${year} cae ${temporality} de ${season}.`);


  rl.close();
}

seasonWithPart()