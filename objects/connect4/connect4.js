const { ask, rl } = require("../../utils/readline");

(async () => {
    const connect4Game = createConnetc4();
    await connect4Game.play();
})();

function createConnetc4() {

    return {
        async play(){
            const resumed = confirmationDialog()
            do {
                const game = gameView()
                game.play()
            } while (await resumed.gameResumed())
            rl.close();
        }
    }

    function gameView() {
        const game = createGame()
        const board = boardView(game)
        return{
            play(){
                console.log(':::Inicia juego:::');
                do {
                    board.show()
                    game.play()
                } while (!game.getWinner());
            }
        }
    }

    function createGame() {
        const players = [createPlayer('Yellow'), createPlayer('Red')]
        const board = createBoard()
        const turn = createTurn(players.length)
        let winner

        function winnerCheck(){
            winner = parseInt(Math.random()*6) === 5
        }

        return{
            play(){
                this.getCurrentPlayer().play()
                winnerCheck()
                turn.nextTurn()
            },
            getBoard(){
                return board.getBoard()
            },
            getCurrentPlayer(){
                return players[turn.getTurn()]
            },
            getWinner(){
                return winner
            }
        }
    }

    function boardView(game){
        return{
            show(){
                console.log('Board: ' + game.getBoard());
                console.log('Turno jugador: ' + game.getCurrentPlayer().getColor());
            }
        }
    }

    function createBoard(){
        let board = ['1', '2', '3', '4', '5', '6', '7']
        return {
            getBoard(){
                return board
            }
        }
    }

    function createPlayer(tokenColor){
        const color = tokenColor
        return{
            play(){

            },
            getColor(){
                return color
            }
        }
    }

    function createTurn(numPlayers) {
        let turn = 0
        return {
            nextTurn(){
                turn = (turn + 1) % numPlayers;
            },
            getTurn(){
                return turn
            }
        }
    }

    function confirmationDialog() {
        let result;
        let answer;
        let error = false;
        return {
            async gameResumed(){
                await gameResumedView()
                return result
            }
        }
        async function gameResumedView() {
            do {
                answer = await ask(`¿Quieres jugar otra partida? `);
                result = answer === `si`;
                error = !result && answer !== `no`;
                if (error) {
                    console.log(`Por favor, responda "si" o "no"`);
                }
            } while (error);
        } 
    }

    rl.close();
}