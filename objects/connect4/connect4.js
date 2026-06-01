const { ask, rl } = require("../../utils/readline");

(async () => {
    const connect4Game = await initConnetc4();
    await connect4Game.play();
})();

async function initConnetc4() {

    return {
        async play(){
            const resumed = await isResumed()
            do {
                const game = await initGame()
                game.play()
            } while (await resumed.gameResumed())
            rl.close();
        }
    }

    async function initGame() {
        const gameMode = await setGameMode()
        let tokens = []
        let turn = 0
        let winner
        
        async function setGameMode() {
            let players;
            do {
                players = await ask('¿Cuántos jugadores? ');
                error = players < 0 || 2 < players;
                if (error) {
                    console.log(`Por favor escoja entre 0, 1 y 2`)
                }
            } while (error);
            return [
                ['computer vs computer'],
                ['player vs computer'],
                ['player vs player']
            ][players]
        }

        return{
            play(){
                return console.log('inicia juego');
            }
        }
    }

    function nextTurn() {
        const players = []
        const board = []
        return {
            getActivePlayer(){

            }
        }
    }

    function initPlayer(playerType){
        const color = ''
        return{
            play(){

            }
        }
    }

    function initBoard(){

    }

    async function isResumed() {
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