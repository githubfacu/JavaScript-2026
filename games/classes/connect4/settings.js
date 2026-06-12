
export class GameSettings {
    static RED = 'Red'
    static YELLOW = 'Yellow'
    static NUMBER_PLAYERS = 2
    #numberControllablePlayers

    constructor(){
        this.#numberControllablePlayers
    }

    get numberControllablePlayers (){
        return this.#numberControllablePlayers
    }

    setPlayers(controllablePlayers){
        this.#numberControllablePlayers = controllablePlayers
    }
}
