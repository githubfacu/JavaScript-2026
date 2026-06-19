import { ask } from "../../utils/readline.js"
import { ConfirmationDialog } from "../../models/comfirm-dialog.js"

export class ConfirmationDialogView{
    #dialog
    #affirmative
    #negative
    #SUFFIX
    #MESSAGE

    constructor(){
        this.#dialog = new ConfirmationDialog(),
        this.#affirmative = this.#dialog.getAffirmative(),
        this.#negative = this.#dialog.getNegative(),
        this.#SUFFIX = `? (` + this.#affirmative + `/` + this.#negative + `): `,
        this.#MESSAGE = `Por favor, responda ${this.#affirmative} o ${this.#negative}`
    }

    async read() {
        let ok
        do {
            this.#dialog.setAnswer(await ask(this.#SUFFIX))
            ok = this.#dialog.isAffirmative() || this.#dialog.isNegative()
            if (!ok) {
                console.log(this.#MESSAGE)

            }
        } while (!ok)
    }
    isAffirmative() {
        return this.#dialog.isAffirmative()
    }
}