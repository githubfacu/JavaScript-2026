import { GameSettings } from "../../models/settings.js";

export class SettingsView {
    #settings
    #modal
    #buttonsText
    #onSettingsReady

    constructor(onSettingsReady) {
        this.#settings = new GameSettings()
        this.#modal = document.getElementById('settings')
        this.#buttonsText = [
            'CPU vs CPU',
            'Player vs CPU',
            'Player vs Player'
        ]
        this.#onSettingsReady = onSettingsReady
    }

    get settings() {
        return this.#settings
    }

    render() {
        const buttonsContainer = document.createElement('div')
        buttonsContainer.classList.add('settings_buttons_container')
        this.#modal.appendChild(buttonsContainer)

        for (let i = GameSettings.NUMBER_PLAYERS; i >= 0; i--) {
            const button = document.createElement('button')

            button.innerText = this.#buttonsText[i]

            button.addEventListener('click', () => {
                this.#settings.setPlayers(i)
                this.#onSettingsReady(this.#settings)
                this.#modal.remove()
            })

            buttonsContainer.appendChild(button)
        }
    }
}