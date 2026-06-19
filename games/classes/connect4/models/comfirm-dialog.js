
export class ConfirmationDialog{
    #AFFIRMATIVE = 'si'
    #NEGATIVE = 'no'
    #answer

    isAffirmative() {
        return this.#answer === this.#AFFIRMATIVE
    }
    isNegative() {
        return this.#answer === this.#NEGATIVE
    }
    setAnswer(resp) {
        this.#answer = String(resp).toLowerCase()
    }
    getAffirmative() {
        return this.#AFFIRMATIVE
    }
    getNegative() {
        return this.#NEGATIVE
    }
}