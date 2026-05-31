const { ask, rl } = require("../../utils/readline");

playConnetc4()

async function playConnetc4() {

    do {
        await playGame();
    } while (await isResumed());

    async function playGame() {
        const MAX_PLAYERS = 2;
        const gameMode = await setGameMode()
        let tokens = []
        let turn = 0;
        let winner;
        
        console.log(gameMode);


        async function setGameMode() {
            let numPlayers;
            do {
                numPlayers = await ask('¿Cuántos jugadores? ');
                error = numPlayers < 0 || 2 < numPlayers;
                if (error) {
                    console.log(`Por favor escoja entre 0, 1 y 2`)
                }
            } while (error);
            return [
                ['computer vs computer'],
                ['player vs computer'],
                ['player vs player']
            ][numPlayers]
        }        
    }

    function turn(turn) {
        const players = []
        const board = []
        return {
            getActivePlayer(){

            }
        }
    }

    function player(){
        const color = ''
        return{
            play(){

            }
        }
    }


    async function isResumed() {
        let result;
        let answer;
        let error = false;
        do {
            answer = await ask(`¿Quieres jugar otra partida? `);
            result = answer === `si`;
            error = !result && answer !== `no`;
            if (error) {
                console.log(`Por favor, responda "si" o "no"`);
            }
        } while (error);
        return result;
    }
    rl.close();
}