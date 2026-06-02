const { ask, rl } = require("../../utils/readline");

(async () => {
    const connect4Game = new Connetc4();
    await connect4Game.play();
})();

function Connetc4() {

    return {
        async play(){
            const resumed = new ConfirmationDialog()
            do {
                const game = new Game()
                game.play()
            } while (await resumed.gameResumed())
            rl.close();
        }
    }

    function Game() {
        const players = setPlayers()
        let tokens = []
        let turn = new Turn(2)
        let winner

        function setPlayers() {
            console.log('configuracion cargada');
        }

        return{
            play(){
                return console.log('inicia juego');
            }
        }
    }

    function Turn(numPlayers) {
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

    function Player(){
        const color = ''
        return{
            play(){

            }
        }
    }

    Player.prototype.play = () => {

    }

    function ComputerPlayer(){
    }

    function UserPlayer(){
    }

    function Board(){

    }

    function ConfirmationDialog() {
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