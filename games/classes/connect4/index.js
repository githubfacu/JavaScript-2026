import { SettingsView } from "./views/web/settings.js"
import { GameView } from "./views/web/game.js"
import { Game } from "./models/game.js"

export class Connect4 {

    #settings
    #game
    #gameView

    constructor() {
        this.#settings = new SettingsView(
            (settings) => this.startGame(settings)
        )
        this.#settings.render()
    }

    startGame(settings) {
        this.#game = new Game(settings)
        this.#gameView = new GameView(this.#game)
        this.#gameView.render()
    }
}

window.addEventListener('load', () => {
    new Connect4()
})