const { ask, rl } = require("../../utils/readline");

async function mastermindApp() {

    do {
        await playGame()
    } while (await isResumed())

    async function playGame(){
        let game = initGame()
        await game.secretCombination.setCombination()
        do {
            await game.proposedCombination.setCombination()
            game.attemptResult = resolveCombination(game)
            console.log(game.proposedCombination.getCombination())
            console.log(game.attemptResult)
            if (game.isActive) {
                game.attemps = game.attemps-1
                game.currentAttemp = game.currentAttemp+1
            }
        } while (!game.winner() || !game.isActive())
        if (game.winner()) {
            console.log(`HAS GANADO!!!`)
        }
        console.log(`Combinación secreta: ${game.secretCombination.getCombination()}`)
        console.log('Fin del juego')

        function initGame(){
            let game = {
                attemps: 5,
                currentAttemp: 0,
                secretCombination: combination(generateSecretCombination),
                proposedCombination: combination(generateProposedCombination),
                attemptResult: [],
                isActive(){
                    return this.currentAttemp < 5
                },
                winner (){
                    if (this.attemptResult.length === 0) return false
                    let success = 0
                    for (const element of this.attemptResult) {
                        success = element === 'white' ? success +1 : success
                    }
                    return success === 4
                }
            }
            function combination(combinationBuilder){
                const COLORS = ['RED', 'GREEN', 'BLUE', 'YELLOW', 'CYAN', 'MAGENTA']
                const BUILDER = combinationBuilder
                let combination = []
                
                return {
                    async setCombination(){
                        return combination = await BUILDER(COLORS)
                    }, 
                    getCombination(){
                        return combination
                    },
                }
            }
            function generateSecretCombination(colors){
                let secret = []
                for (let i = 0; i < 4; i++) {
                    secret[i] = colors[parseInt(Math.random()*6)]
                }
                return secret
            }
            return game
        }
        
        async function generateProposedCombination(colors){
            const combination = await inputCombination()
            let sequence = []
            for (let i = 0; i < combination.length; i++) {
                const char = +combination[i]
                sequence[i] = colors[char-1]
            }
            return sequence
        }

        async function inputCombination() {
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