import { ask } from "../../utils/readline.js"
import { Board } from "../../models/board.js"

class PlayerView {
    player

    constructor(player){
        this.player = player
    }

    async play() {}
}

class ComputerPlayerView extends PlayerView{

    constructor(player){
        super(player)
    }

    async play() {
        console.log(this.player.color);
        return Math.floor(Math.random() * Board.COLS)
    }
}

class UserPlayerView extends PlayerView{
    
    constructor(player){
        super(player)
    }

    async play() {
        let error = false
        let column
        console.log(this.player.color);

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

export { UserPlayerView, ComputerPlayerView }