
import { GameSettings } from "../settings.js";
import { ask } from "../../readline.js";

export class SettingsView {
    #settings

    constructor(){
        this.#settings = new GameSettings()
    }

    get settings (){
        return this.#settings
    }

    async setPlayers (){
        let gamePlayers;
        let error
        do {
            gamePlayers = await ask('¿Cuántos jugadores? ');
            error = gamePlayers < 0 || this.#settings.NUMBER_PLAYERS < gamePlayers;
            if (error) {
                console.log(`Por favor escoja entre 0, 1 y 2`)
            }
        } while (error);
        this.#settings.setPlayers(Number(gamePlayers))     
    }
}