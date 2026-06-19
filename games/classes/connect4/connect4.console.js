import { rl } from "./utils/readline.js"
import { ConfirmationDialogView } from "./views/console/comfirm-dialog.js"
import { SettingsView } from "./views/console/settings.js"
import { GameView } from "./views/console/game.js"
import { Game } from "./models/game.js"
import { GameSettings } from "./models/settings.js"

export class Connect4 {

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