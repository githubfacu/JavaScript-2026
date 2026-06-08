const { ask, rl } = require("../../../utils/readline");

class GameSettings {
    static RED
    static YELLOW
    static NUMBER_PLAYERS
    #controllablePlayers

    constructor(){
        this.RED = 'Red'
        this.YELLOW = 'Yellow'
        this.NUMBER_PLAYERS = 2
        this.#controllablePlayers
    }

    get controllablePlayers (){
        return this.#controllablePlayers
    }

    setPlayers(controllablePlayers){
        this.#controllablePlayers = controllablePlayers
    }
}

class SettingsView {

    settings

    constructor(){
        this.settings = new GameSettings()
    }

    get settings (){
        return this.settings
    }

    async setPlayers (){
        let gamePlayers;
        let error
        do {
            gamePlayers = await ask('¿Cuántos jugadores? ');
            error = gamePlayers < 0 || this.settings.NUMBER_PLAYERS < gamePlayers;
            if (error) {
                console.log(`Por favor escoja entre 0, 1 y 2`)
            }
        } while (error);
        this.settings.setPlayers(Number(gamePlayers))     
    }
}

class GameView {
    #game
    #board
    #turn
    #players

    constructor(game){
        this.#game = game
        this.#board = new BoardView()
        this.#turn = new TurnView()        
        this.#players = this.#createPlayerViews()
    }

    #createPlayerViews() {
        return this.#game.players.map(player =>
            player.isComputer
                ? new ComputerPlayerView()
                : new UserPlayerView()
        )
    }
    
    #getWinner(){
        return this.#game.getWinner()
    }

    #printBoard(){
        return this.#board.show(this.#game.getBoard())
    }

    async play() {
        console.log('\n\x1b[32m CONNECT 4 ▥\x1b[0m')

        do {
            this.#printBoard()
            this.#turn.show(this.#game.getCurrentPlayer().color)

            let isValid

            do {
                if (isValid === false) {
                    console.log('La columna está llena')
                }
                
                const column = await this.#players[this.#game.turn.getTurn()].play()

                isValid = this.#game.play(column)

            } while (!isValid)

        } while (
            !this.#getWinner() &&
            !this.#game.getDraw()
        )

        this.#printBoard()

        if (this.#getWinner()) {
            console.log(`\nGana ${this.#getWinner()}`)
        } else {
            console.log('\nEmpate')
        }
    }
}

class Game {
    static players
    static board
    static turn
    #winner = null
    #draw = false
    settings

    constructor(settings){
        this.settings = settings
        this.players = [
            new Player(settings.RED, settings.controllablePlayers === 0),
            new Player(settings.YELLOW, settings.controllablePlayers !== settings.NUMBER_PLAYERS)
        ]
        this.board = new Board()
        this.turn = new Turn(this.settings.NUMBER_PLAYERS)
    }
    
    drawCheck() {
        this.#draw = this.board.isComplete()
    }

    play(column) {
        const currentPlayer = this.getCurrentPlayer()
        const token = currentPlayer.color
        const position = this.board.insertToken(
            column,
            token
        )
        if (!position) {
            return false
        }
        if (this.board.isConnect4(position, token)) {
            this.#winner = token
        }
        if (!this.#winner) {
            this.drawCheck()
        }
        if (!this.#winner && !this.#draw) {
            this.turn.nextTurn()
        }
        return true
    }
    getBoard() {
        return this.board.getBoard()
    }
    getCurrentPlayer() {
        return this.players[this.turn.getTurn()]
    }
    getWinner() {
        return this.#winner
    }
    getDraw() {
        return this.#draw
    }
}

class PlayerView {

    async play() {
        return Math.floor(Math.random() * Board.COLS)
    }
}

class ComputerPlayerView extends PlayerView{

    constructor(){
        super()
    }
}

class UserPlayerView extends PlayerView{
    
    constructor(){
        super()
    }
    async play() {
        let error = false
        let column

        do {
            column = await ask('Elije una columna [1 a 7]: ')
            error = Board.isColumnValid(+column)
            if (error) {
                console.log('Por favor, ingresar una columna válida')
            }
        } while (error)
        return +column - 1
    }
}

class Player{
    #color
    #isComputerPlayer

    constructor(tokenColor, isComputerPlayer){
        this.#color = tokenColor
        this.#isComputerPlayer = isComputerPlayer
    }

    get color() {
        return this.#color
    }

    get isComputerPlayer(){
        return this.#isComputerPlayer
    }
}

class BoardView {
    show(board) {
        console.log('═════════════')
        for (const row of board) {
            console.log(
                row.map(cell => {
                    if (cell === 'Yellow') {
                        return '\x1b[33m●\x1b[0m'
                    }

                    if (cell === 'Red') {
                        return '\x1b[31m●\x1b[0m'
                    }

                    return '.'
                }).join(' ')
            )
        }
        console.log('═════════════')
        console.log('1 2 3 4 5 6 7')
    }
}

class Board {
    static ROWS = 6
    static COLS = 7
    board = Array.from(
        { length: Board.ROWS },
        () => Array(Board.COLS).fill(null)
    )
    
    static isColumnValid(column){
        return column < 1 || column > this.COLS
    }
    insertToken(column, token) {
        for (let row = Board.ROWS - 1; row >= 0; row--) {
            if (this.board[row][column] === null) {
                this.board[row][column] = token

                return {
                    row,
                    column
                }
            }
        }
        return null
    }
    isConnect4(position, token) {
        const directions = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1]
        ]

        for (const [rowStep, columnStep] of directions) {
            let count = 1

            let row = position.row + rowStep
            let column = position.column + columnStep

            while (this.board[row]?.[column] === token) {
                count++
                row += rowStep
                column += columnStep
            }

            row = position.row - rowStep
            column = position.column - columnStep

            while (this.board[row]?.[column] === token) {
                count++
                row -= rowStep
                column -= columnStep
            }

            if (count >= 4) {
                return true
            }
        }

        return false
    }
    isComplete() {
        return this.board.every(
            row => row.every(cell => cell !== null)
        )
    }
    getBoard() {
        return this.board.map(row => [...row])
    }
}

class TurnView{
    show(player) {
        console.log('Turno: ' + player)
    }
}

class Turn{
    #turn = 0
    #numPlayers

    constructor(numPlayers){
        this.#numPlayers = numPlayers
    }

    nextTurn() {
        this.#turn = (this.#turn + 1) % this.#numPlayers
    }
    getTurn() {
        return this.#turn
    }
}

class ConfirmationDialog{
    #AFFIRMATIVE = 'si'
    #NEGATIVE = 'no'
    #answer

    isAffirmative() {
        return this.#answer === this.#AFFIRMATIVE
    }
    isNegative() {
        return this.#answer === this.#NEGATIVE
    }
    setAnswer(resp) {
        this.#answer = String(resp).toLowerCase()
    }
    getAffirmative() {
        return this.#AFFIRMATIVE
    }
    getNegative() {
        return this.#NEGATIVE
    }
}

class ConfirmationDialogView {
    #dialog
    #affirmative
    #negative
    #SUFFIX
    #MESSAGE

    constructor(){
        this.#dialog = new ConfirmationDialog(),
        this.#affirmative = this.#dialog.getAffirmative(),
        this.#negative = this.#dialog.getNegative(),
        this.#SUFFIX = `? (` + this.#affirmative + `/` + this.#negative + `): `,
        this.#MESSAGE = `Por favor, responda ${this.#affirmative} o ${this.#negative}`
    }

    async read() {
        let ok
        do {
            this.#dialog.setAnswer(await ask(this.#SUFFIX))
            ok = this.#dialog.isAffirmative() || this.#dialog.isNegative()
            if (!ok) {
                console.log(this.#MESSAGE)

            }
        } while (!ok)
    }
    isAffirmative() {
        return this.#dialog.isAffirmative()
    }
}

class Connect4 {

    async start() {
        do {
            const settings = new SettingsView()
            await settings.setPlayers()
            const game = new Game(settings.settings)
            const gameView = new GameView(game)
            await gameView.play()
        } while (await this.isResumed())
        rl.close()
    }

    async isResumed() {
        const dialog = new ConfirmationDialogView()
        await dialog.read()
        return dialog.isAffirmative()
    }
}

new Connect4().start()