import { BoardView } from "./board.js"
import { TurnView } from "./turn.js"
import { ComputerPlayerView, UserPlayerView } from "./player.js"

export class GameView {
    #game
    #board
    #turn
    #gameElement
    #gameInfo
    #gameMessage

    constructor(game){
        this.#game = game
        this.#board = new BoardView()
        this.#turn = new TurnView()
        this.#gameElement = document.getElementById('game')
        this.#gameInfo = document.getElementById('game_info')
        this.#gameMessage = document.getElementById('game_message')
        this.#gameMessage.style.display = 'block'
        this.#gameInfo.appendChild(this.resetButton())
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
        return this.#board.render(this.#game.getBoard())
    }

    async render() {
        while (!this.#game.getWinner() && !this.#game.getDraw()) {
            this.#gameElement.replaceChildren();
            this.#gameMessage.replaceChildren();

            this.#gameMessage.appendChild(
                this.#turn.render(this.#game.getTurn(), true)
            );

            this.#gameElement.appendChild(
                this.#board.render(this.#game.getBoard())
            );

            const column = await this.interact();
            this.#game.play(column);
        }

        this.#gameElement.replaceChildren();

        this.#gameElement.appendChild(
            this.#board.render(this.#game.getBoard())
        );

        const winner = this.#game.getWinner();
        if (winner) {
            this.#gameMessage.replaceChildren();
            this.#gameMessage.appendChild(this.#turn.render(this.#game.getTurn(), false))
        } else {
            this.#gameMessage.innerText = 'Empate'
        }
    }

    resetButton() {
        const button = document.createElement('button')
        button.classList.add('reset_button')
        button.innerText = 'Reiniciar'
        button.addEventListener('click', () => {
            document.location.reload()
        })
        return button
    }
}