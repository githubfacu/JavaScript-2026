import { Board } from "./board.js"
import { ComputerPlayer, UserPlayer } from "./player.js"
import { GameSettings } from "./settings.js"
import { Turn } from "./turn.js"

export class Game{
    #players
    #board
    #turn
    #winner = null
    #draw = false

    constructor(settings){
        this.#board = new Board()
        this.#turn = new Turn()
        this.#players = []
        this.reset(settings.numberControllablePlayers)
    }

    reset(userPlayers) {
        const colors = [
            GameSettings.RED,
            GameSettings.YELLOW
        ]

        for (let i = 0; i < GameSettings.NUMBER_PLAYERS; i++) {
            const color = colors[i]

            this.#players[i] =
                i < userPlayers
                    ? new UserPlayer(color)
                    : new ComputerPlayer(color)
        }
    }
    
    #drawCheck() {
        this.#draw = this.#board.isComplete()
    }

    play(column) {
        const currentPlayer = this.getCurrentPlayer()
        const token = currentPlayer.color
        const position = this.#board.insertToken(
            column,
            token
        )
        if (!position) {
            return false
        }
        if (this.#board.isConnect4(position, token)) {
            this.#winner = token
        }
        if (!this.#winner) {
            this.#drawCheck()
        }
        if (!this.#winner && !this.#draw) {
            this.#turn.nextTurn()
        }
        return true
    }
    getBoard() {
        return this.#board.getBoard()
    }
    getCurrentPlayer() {
        return this.#players[this.#turn.getTurn()]
    }
    getWinner() {
        return this.#winner
    }
    getDraw() {
        return this.#draw
    }
}