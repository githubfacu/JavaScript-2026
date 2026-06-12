import { ask, rl } from "../../../../utils/readline.js";

(async () => {
    const connect4Game = new Connetc4();
    await connect4Game.play()
})();

function Connetc4() {

    this.play = async function (){
        this.resumed = new ConfirmationDialog()
        do {
            const game = new GameView()
            game.play()
        } while (await this.resumed.gameResumed())
        rl.close()
    }
    
    function GameView() {
        this.game = new Game()
        this.board = new BoardView()
        this.turn = new TurnView()

        this.play = function (){
                console.log('::: Inicia juego :::');
                do {
                    this.board.show(this.game.getBoard())
                    this.turn.show(this.game.getCurrentPlayer())
                    this.game.play()
                } while (!this.game.getWinner());
            }
    }

    function Game() {
        this.players = [new Player('Yellow'), new Player('Red')]
        this.board = new Board()
        this.turn = new Turn(2)
        this.winner = false

        this.winnerCheck = function(){
            this.winner = parseInt(Math.random()*6) === 5
        }

        this.play = function(){
            this.getCurrentPlayer().play()
            this.winnerCheck()
            this.turn.nextTurn()
        }
        this.getBoard = function(){
            return this.board.getBoard()
        }
        this.getCurrentPlayer = function(){
            return this.players[this.turn.getTurn()]
        }
        this.getWinner = function(){
            return this.winner
        }
    }

    function Player(tokenColor){
        this.color = tokenColor

        this.play = function(){
            console.log(this.color +' inserta token');
        },
        this.getColor = function(){
            return this.color
        }
    }

    function ComputerPlayer(){
    }

    function UserPlayer(){
    }

    function BoardView(){

        this.show = function(board){
            console.log('::: Board :::' + board);
        }
    }

    function Board(){
        this.board = []

        this.getBoard = function(){
            return this.board
        }
    }

    function TurnView(){

        this.show = function(player){
            console.log('Juega: ' + player.getColor());
        }
    }

    function Turn(numPlayers) {
        this.turn = 0

        this.nextTurn = function(){
            this.turn = (this.turn + 1) % numPlayers
        },
        this.getTurn = function(){
            return this.turn
        }
    }

    function ConfirmationDialog() {
        this.result = false
        this.answer = null
        this.error = false

        this.gameResumed = async function(){
            await this.gameResumedView()
            return this.result
        }

        this.gameResumedView = async function() {
            do {
                this.answer = await ask(`¿Quieres jugar otra partida? `)
                this.result = this.answer === `si`
                this.error = !this.result && this.answer !== `no`
                if (this.error) {
                    console.log(`Por favor, responda "si" o "no"`)
                }
            } while (this.error)
        } 
    }
}