const { ask, rl } = require("../../utils/readline");

async function mastermindApp() {

    do {
        await playGame()
    } while (await isResumed())

    async function playGame(){
        const COLORS = ['RED', 'GREEN', 'BLUE', 'YELLOW', 'CYAN', 'MAGENTA']
        const SECRET_COMBINATION = getSecretCombination(COLORS)
        let attemps = 5
        let currentAttemp = 0
        let winner

        do {
            const PROPOSED_COMBINATION = buildCombination(await getProposedCombination(), COLORS)
            const RESOLVE_PROPOSED_COMBINATION = resolveCombination(PROPOSED_COMBINATION, SECRET_COMBINATION)
            winner = winCheck(RESOLVE_PROPOSED_COMBINATION)
            console.log(PROPOSED_COMBINATION)
            console.log(RESOLVE_PROPOSED_COMBINATION)
            if (!winner) {
                attemps = attemps-1
                currentAttemp = currentAttemp+1
            }
        } while (!winner && attemps > 0)
        if (winner) {
            console.log(`HAS GANADO!!!`)
        }
        console.log(`Combinación secreta: ${SECRET_COMBINATION}`)
        console.log('Fin del juego')

        function getSecretCombination(colors){
            let secret = []
            for (let i = 0; i < 4; i++) {
                secret[i] = colors[parseInt(Math.random()*6)]
            }
            return secret
        }

        function buildCombination(combination, colors){
            let sequence = []
            for (let i = 0; i < combination.length; i++) {
                const char = +combination[i]
                sequence[i] = colors[char-1]
            }
            return sequence
        }

        async function getProposedCombination() {
            let error
            let combination
            do {
                combination = await ask('1. RED\n' + '2. GREEN\n' + '3. BLUE\n' + '4. YELLOW\n' + '5. CYAN\n' + '6. MAGENTA\n'+ 'Haz tu combinación: ')
                error = !isValidCombination(combination)
                if (error) {
                    console.log(`La secuencia no es válida`)
                }
            } while (error)
            return combination
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

        function resolveCombination(combination, secret) {
            let result = []
            let used = [false, false, false, false]
            for (let i = 0; i < combination.length; i++) {
                if (combination[i] === secret[i]) {
                    result[i] = 'white'
                    used[i] = true
                }
            }
            for (let i = 0; i < combination.length; i++) {
                if (result[i] !== 'white') {
                    for (let j = 0; j < secret.length; j++) {
                        if (used[j] === false) {
                            if (combination[i] === secret[j]) {
                                result[i] = 'black'
                                used[j] = true
                                break
                            }
                        }
                    }
                }
            }
            return result
        }
        
        function winCheck(combination){
            let win = 0
            for (const element of combination) {
                win = element === 'white' ? win +1 : win
            }
            return win === 4
        }
    }

    async function isResumed() {
        let result
        let answer
        let error = false
        do {
            answer = await ask(`¿Quieres jugar otra partida? `)
            result = answer === `si`
            error = !result && answer !== `no`
            if (error) {
                await ask(`Por favor, responda "si" o "no"`)
            }
        } while (error)
        return result
    }

    rl.close()
}

mastermindApp()