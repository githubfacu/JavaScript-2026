const { ask, rl } = require("../../../utils/readline");

(async () => {
    const connect4Game = createConnetc4();
    await connect4Game.start();
})();

function createConnetc4() {

    return {
        async start(){
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
        const board = boardView()
        const turn = turnView()
        const player = playerView()

        return {
            async play() {
                console.log('\n\x1b[32m  CONNECT 4  \x1b[0m');
                do {
                    board.show(game.getBoard())
                    turn.show(game.getCurrentPlayer().getColor())
                    let isValid
                    do {
                        if (isValid === false) {
                            console.log('La columna está llena');
                        }
                        const column = await player.play()
                        isValid = game.play(column)
                    } while (!isValid)
                } while (!game.getWinner())
            }
        }
    }

    function createGame() {
        const players = [createPlayer('Yellow'), createPlayer('Red')]
        const board = createBoard()
        const turn = createTurn(players.length)
        let winner

        function winnerCheck(){
            winner = false
        }

        return{
            play(column){
                const inserted = board.insertToken(column, this.getCurrentPlayer().getColor())
                if (!inserted) {
                    return false
                }
                winnerCheck()
                turn.nextTurn()
                return true
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

    function boardView(){
        return{
            show(board){
                for (const row of board) {
                    console.log(
                        row.map(cell => cell ?? '.').join(' ')
                    );
                }
                console.log('═════════════');
            }
        }
    }

    function createBoard(){
        const ROWS = 6
        const COLS = 7

        const board = Array.from(
            { length: ROWS },
            () => Array(COLS).fill(null)
        );

        return {
            insertToken(column, token) {
                for (let row = ROWS - 1; row >= 0; row--) {
                    if (board[row][column] === null) {
                        board[row][column] = token[0]
                        return true;
                    }
                }
                return false
            },
            getBoard(){
                return board
            }
        }
    }

    function playerView() {

        return {
            async play() {
                let error = false
                let column = undefined
                do {
                    column = await ask('Elije una columna [1 a 7]: ')
                    column = Number(column)
                    error = (
                        Number.isNaN(column) ||
                        column < 1 ||
                        column > 7
                    )
                    if (error) {
                        console.log('Por favor, ingresar una columna válida [1 a 7]')
                    }
                } while (error)
                return column - 1
            }
        };
    }

    function createPlayer(tokenColor){
        const color = tokenColor
        return{
            getColor(){
                return color
            }
        }
    }

    function turnView(){
        return{
            show(player){
                console.log('Juega: ' + player);
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
}