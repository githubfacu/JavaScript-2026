import { Game } from "./game.js";
import { rl } from "../readline.js";
import { GameSettings } from "./settings.js";
import { ConfirmationDialogView } from "./views/comfirm-dialog.js";
import { GameView } from "./views/game.js";
import { SettingsView } from "./views/settings.js";

class Connect4 {

    async start() {
        do {
            const settings = new SettingsView()
            await settings.setPlayers()
            const game = new Game(settings.settings)
            const gameView = new GameView(game)
            await gameView.play()
        } while (await this.#isResumed())
        rl.close()
    }

    async #isResumed() {
        const dialog = new ConfirmationDialogView()
        await dialog.read()
        return dialog.isAffirmative()
    }
}

new Connect4().start()