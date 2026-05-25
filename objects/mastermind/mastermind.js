const { ask, rl } = require("../../utils/readline");

async function mastermindApp() {

    do {
        await playGame()
    } while (await isResumed())

    async function playGame(){
        let game = initGame()
        do {
            await game.proposedCombination.setCombination()
            game.attemptResult = resolveCombination(game)
            console.log(game.proposedCombination.getCombination())
            console.log(game.attemptResult)
            if (game.isActive) {
                game.attemps = game.attemps-1
            }
        } while (game.isActive())
        if (game.isWinner()) {
            console.log(`HAS GANADO!!!`)
        }
        console.log(`Combinación secreta: ${game.secretCombination.getCombination()}`)
        console.log('Fin del juego')

        function initGame(){
            let game = {
                attemps: 5,
                secretCombination: combination(generateSecretCombination),
                proposedCombination: combination(generateProposedCombination),
                attemptResult: [],
                isActive(){
                    return !this.isWinner() && this.attemps > 0
                },
                isWinner(){
                    let success = 0
                    for (const element of this.attemptResult) {
                        success = element === 'white' ? success +1 : success
                    }
                    return success === this.attemptResult.length
                }
            }
            function combination(combinationBuilder){
                const COLORS = ['RED', 'GREEN', 'BLUE', 'YELLOW', 'CYAN', 'MAGENTA']
                const COMBINATION_LENGTH = 4
                const BUILDER = combinationBuilder
                let combination = []
                
                return {
                    async setCombination(){
                        return combination = await BUILDER(COLORS, COMBINATION_LENGTH)
                    }, 
                    getCombination(){
                        return combination
                    },
                    getCombinationLength(){
                        return COMBINATION_LENGTH
                    }
                }
            }
            function generateSecretCombination(colors, combinationLength){
                let secret = []
                for (let i = 0; i < combinationLength; i++) {
                    secret[i] = colors[parseInt(Math.random()*colors.length)]
                }
                return secret
            }

            game.secretCombination.setCombination()
            return game
        }

        async function generateProposedCombination(colors, combinationLength) {
            let error
            let combination
            let sequence = []
            do {
                combination = await ask('1. RED\n' + '2. GREEN\n' + '3. BLUE\n' + '4. YELLOW\n' + '5. CYAN\n' + '6. MAGENTA\n'+ 'Haz tu combinación: ')
                error = combination.length !== combinationLength || !isValidCombination(combination)
                if (error) {
                    console.log(`La secuencia no es válida`)
                }
            } while (error)
            for (let i = 0; i < combinationLength; i++) {
                const char = +combination[i]
                sequence[i] = colors[char-1]
            }
            return sequence
        }

        function isValidCombination(combination){
            for (const char of combination) {
                if (+char < 1 || +char > 6){
                    return false
                }
            }
            return true
        }
        
        function resolveCombination(game) {
            const secretCombination = game.secretCombination.getCombination()
            const proposedCombination = game.proposedCombination.getCombination()
            let result = []
            let used = [false, false, false, false]
            for (let i = 0; i < used.length; i++) {
                if (proposedCombination[i] === secretCombination[i]) {
                    result[i] = 'white'
                    used[i] = true
                }
            }
            for (let i = 0; i < used.length; i++) {
                if (result[i] !== 'white') {
                    for (let j = 0; j < used.length; j++) {
                        if (used[j] === false) {
                            if (proposedCombination[i] === secretCombination[j]) {
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