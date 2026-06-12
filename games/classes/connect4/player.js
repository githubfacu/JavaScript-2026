
class Player{
    #color

    constructor(tokenColor){
        this.#color = tokenColor
    }

    get color() {
        return this.#color
    }

    accept(visitor){}
}

class UserPlayer extends Player {

    constructor(color) {
        super(color)
    }

    accept(visitor){
        return visitor.visitUserPlayer(this)
    }
}

class ComputerPlayer extends Player {

    constructor(color) {
        super(color)
    }

    accept(visitor){
        return visitor.visitComputerPlayer(this)
    }
}

export { UserPlayer, ComputerPlayer }