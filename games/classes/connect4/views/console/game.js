import { ask } from "../../utils/readline.js"
import { BoardView } from "./board.js"
import { TurnView } from "./turn.js"
import { ComputerPlayerView, UserPlayerView } from "./player.js"

export class GameView {
    #game
    #board
    #turn

    constructor(game){
        this.#game = game
        this.#board = new BoardView()
        this.#turn = new TurnView()
    }
    
    async interact(){
        return this.#game.getCurrentPlayer().accept(this)
    }

    visitComputerPlayer(computerPlayer){
        return new ComputerPlayerView(computerPlayer).play()
    }
    
    visitUserPlayer(userPlayer){
        return new UserPlayerView(userPlayer).play()
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

            let isValid

            do {
                if (isValid === false) {
                    console.log('La columna está llena')
                }
                
                const column = await this.interact()

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
