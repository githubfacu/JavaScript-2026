const { ask, rl } = require("../utils/readline");

async function mastermindApp() {

    do {
        await playGame();
    } while (await isResumed());

    async function playGame(){
        const COLORS = ['RED', 'GREEN', 'BLUE', 'YELLOW', 'CYAN', 'MAGENTA']
        const SECRET_COMBINATION = getSecretCombination(COLORS)
        const COLORS_OPTIONS = '1. RED\n' + '2. GREEN\n' + '3. BLUE\n' + '4. YELLOW\n' + '5. CYAN\n' + '6. MAGENTA\n'
        let attemps = 5
        let combinationList = [];
        let combinationResultList = [];
        let currentAttemp = 0
        let winner
        do {
            await getProposedCombination(COLORS_OPTIONS);
            combinationResultList[currentAttemp] = resolveCombination(combinationList[currentAttemp], SECRET_COMBINATION)
            winner = winCheck(combinationResultList[currentAttemp])
            console.log(combinationList[currentAttemp]);
            console.log(combinationResultList[currentAttemp]);
            if (!winner) {
                attemps = attemps-1
                currentAttemp = currentAttemp+1;
            }
        } while (!winner && attemps > 0);
        if (winner) {
            console.log(`HAS GANADO!!!`);
        }
        console.log(`Combinación secreta: ${SECRET_COMBINATION}`);
        console.log('Fin del juego');

        function getSecretCombination(colors){
            let secret = []
            for (let i = 0; i < 4; i++) {
                secret[i] = colors[parseInt(Math.random()*6)]
            }
            return secret
        }

        async function getProposedCombination() {
            let error;
            let combination;
            do {
                combination = await ask(`${COLORS_OPTIONS}Haz tu combinación: `);
                error = !isValidCombination(combination);
                if (error) {
                    console.log(`La secuencia no es válida`);
                }
            } while (error);
            if (combination) {
                combination = buildCombination(combination, COLORS)
                combinationList[currentAttemp] = combination;
            }
        }

        function isValidCombination(combination){
            if (combination.length !== 4) {
                return false
            }
            for (const char of combination) {
                if (+char < 1 || +char > 6){
                    return false
                }
            }
            return true
        }

        function buildCombination(combination, colors){
            let sequence = []
            for (let i = 0; i < combination.length; i++) {
                const char = +combination[i]
                sequence[i] = colors[char-1]
            }
            return sequence
        }

        function resolveCombination(combination, secret){
            let result = []
            for (let i = 0; i < combination.length; i++) {
                for (let j = 0; j < secret.length; j++) {
                    if (combination[i] === secret[j]) {
                        result[i] = 'black'
                    }
                    if (combination[i] === secret[i]) {
                        result[i] = 'white'
                    }
                }
            }
            return result
        }        
    }

    function winCheck(combination){
        let win = 0
        for (const element of combination) {
            win = element === 'white' ? win +1 : win
        }
        return win === 4
    }

    async function isResumed() {
        let result;
        let answer;
        let error = false;
        do {
            answer = await ask(`¿Quieres jugar otra partida? `);
            result = answer === `si`;
            error = !result && answer !== `no`;
            if (error) {
                await ask(`Por favor, responda "si" o "no"`);
            }
        } while (error);
        return result;
    }

    rl.close();
}

mastermindApp();