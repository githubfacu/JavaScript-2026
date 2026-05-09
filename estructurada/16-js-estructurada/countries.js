const { ask, rl } = require('../../utils/readline');

const { NAMES : countries } = require('./data/names')

async function countriesApp(){

    const OPTIONS_MENU = '1. Ver países\n' + '2. Buscar país\n' + '3. Salir\n' + 'Escoge opción? [1-3]: '
    let optionSelected
    
    do {
        switch (+optionSelected) {
            case 1:
                console.log(countries);
                break;
            case 2:
                let countryToSearch = await ask('Dame el nombre del país: ')
                let isCountryIncluded = false
                for (let i = 0; !isCountryIncluded && i < countries.length; i++) {
                    isCountryIncluded = countries[i] === countryToSearch
                }
                console.log(`El país ${countryToSearch} ${isCountryIncluded ? 'si' : 'no'} está incluido`);
                break;
            default:
                break;
        }        
        optionSelected = await ask(OPTIONS_MENU)
    } while (optionSelected != 3);

    console.log('Fin de la aplicación');
    rl.close();
}

countriesApp()