import { GameSettings } from "./settings.js"

export class Turn{
    #turn

    constructor(){
        this.#turn = 0
    }

    nextTurn() {
        this.#turn = (this.#turn + 1) % GameSettings.NUMBER_PLAYERS
    }
    getTurn() {
        return this.#turn
    }
}