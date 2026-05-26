const { ask, rl } = require("../../utils/readline");

mastermindApp()

async function mastermindApp() {

    do {
        await playGame()
    } while (await isResumed())

    rl.close()
}

async function playGame(){

    let game = initGame()
    let winner = false
    do {
        await game.play()
        winner = game.isWinner()
        if (winner) {
            break
        }
        game.totalAttempts--
        game.currentAttempt++
    } while (game.totalAttempts > 0)
    if (winner) {
        gameView('HAS GANADO!!!')
    }
    game.secretCombination.view('Combinación secreta: ')
    gameView('Fin del juego')

    function initGame(){
        let game = {
            secretCombination: combination(generateSecretCombination),
            totalAttempts: 5,
            currentAttempt: 0,
            proposedCombinations: [],
            attemptsResults: [],
            play: async () => {
                const proposedCombination = combination(generateProposedCombination)
                await proposedCombination.setCombination()
                game.attemptsResults[game.currentAttempt] = resolveCombination(game.secretCombination.getCombination(), proposedCombination.getCombination())
                game.proposedCombinations[game.currentAttempt] = proposedCombination.getCombination()
                proposedCombination.view()
                gameView(game.attemptsResults[game.currentAttempt])
            },
            isWinner(){
                const lastAttempt = this.attemptsResults[this.currentAttempt]
                const attemptLength = this.secretCombination.getCombination().length
                let success = 0                
                for (const element of lastAttempt) {
                    success = element === 'white' ? success +1 : success
                }
                return success === attemptLength
            }
        }

        game.secretCombination.setCombination()
        return game
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
            view(message){
                gameView(combination, message)
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
    
    async function generateProposedCombination(colors, combinationLength) {
        let error
        let combination
        do {
            combination = await ask('1. RED\n' + '2. GREEN\n' + '3. BLUE\n' + '4. YELLOW\n' + '5. CYAN\n' + '6. MAGENTA\n'+ 'Haz tu combinación: ')
            error = !isValidCombination(combination, combinationLength)
            if (error) {
                console.log(`La secuencia no es válida`)
            }
        } while (error)
        return proposedCombinationMapper(combination, colors, combinationLength)
    }

    function isValidCombination(combination, combinationLength){
        if (combination.length !== combinationLength) return false
        for (const char of combination) {
            if (+char < 1 || +char > 6){
                return false
            }
        }
        return true
    }

    function proposedCombinationMapper(combination, colors, combinationLength){
        let sequence = []
        for (let i = 0; i < combinationLength; i++) {
            const char = +combination[i]
            sequence[i] = colors[char-1]
        }
        return sequence
    }
    
    function resolveCombination(secretCombination, proposedCombination) {
        let result = []
        let secretUsed = [false, false, false, false]
        let proposedUsed = [false, false, false, false]
        for (let i = 0; i < proposedCombination.length; i++) {
            if (proposedCombination[i] === secretCombination[i]) {
                result[i] = 'white'
                secretUsed[i] = true
                proposedUsed[i] = true
            }
        }
        for (let i = 0; i < proposedCombination.length; i++) {
            if (!proposedUsed[i]) {
                for (let j = 0; j < secretCombination.length; j++) {
                    if (!secretUsed[j]) {
                        if (proposedCombination[i] === secretCombination[j]) {
                            result[i] = 'black'
                            secretUsed[j] = true
                            proposedUsed[i] = true
                            break
                        }
                    }
                }
            }
        }
        return result
    }

    function gameView(view, message = ''){
        return console.log(message + '| ' + view + ' |');
    }
}

async function isResumed() {
    let result
    let answer
    let error = false
    do {
        answer = await ask('¿Quieres jugar otra partida? ')
        result = answer === 'si'
        error = !result && answer !== 'no'
        if (error) {
            console.log(`Por favor, responda "si" o "no"`)
        }
    } while (error)
    return result
}