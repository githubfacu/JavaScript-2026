const { ask, rl } = require("../../utils/readline");

async function mastermindApp() {

    do {
        await playGame()
    } while (await isResumed())

    async function playGame(){
        let game = initGame()
        let winner

        do {
            buildCombination(await setProposedCombination(), game)
            resolveCombination(game)
            winner = winCheck(game)
            console.log(game.proposedCombination)
            console.log(game.resolveProposedCombination)
            if (!winner) {
                game.attemps = game.attemps-1
                game.currentAttemp = game.currentAttemp+1
            }
        } while (!winner && game.attemps > 0)
        if (winner) {
            console.log(`HAS GANADO!!!`)
        }
        console.log(`Combinación secreta: ${game.secretCombination}`)
        console.log('Fin del juego')

        function initGame(){
            let game = {
                colors: ['RED', 'GREEN', 'BLUE', 'YELLOW', 'CYAN', 'MAGENTA'],
                attemps: 5,
                currentAttemp: 0,
                secretCombination: [],
                proposedCombination: [],
                resolveProposedCombination: [],
            }

            game.secretCombination = setSecretCombination(game.colors)
            return game
        }

        function setSecretCombination(colors){
            let secret = []
            for (let i = 0; i < 4; i++) {
                secret[i] = colors[parseInt(Math.random()*6)]
            }
            return secret
        }

        function buildCombination(combination, game){
            let sequence = []
            for (let i = 0; i < combination.length; i++) {
                const char = +combination[i]
                sequence[i] = game.colors[char-1]
            }
            return game.proposedCombination = sequence
        }

        async function setProposedCombination() {
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

        function resolveCombination(game) {
            let result = []
            let used = [false, false, false, false]
            for (let i = 0; i < game.proposedCombination.length; i++) {
                if (game.proposedCombination[i] === game.secretCombination[i]) {
                    result[i] = 'white'
                    used[i] = true
                }
            }
            for (let i = 0; i < game.proposedCombination.length; i++) {
                if (result[i] !== 'white') {
                    for (let j = 0; j < game.secretCombination.length; j++) {
                        if (used[j] === false) {
                            if (game.proposedCombination[i] === game.secretCombination[j]) {
                                result[i] = 'black'
                                used[j] = true
                                break
                            }
                        }
                    }
                }
            }
            return game.resolveProposedCombination = result
        }
        
        function winCheck(game){
            const { resolveProposedCombination } = game
            let win = 0
            for (const element of resolveProposedCombination) {
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