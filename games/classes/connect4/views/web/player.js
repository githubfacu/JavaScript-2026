import { Board } from "../../models/board.js"

class PlayerView {
    player

    constructor(player){
        this.player = player
    }

    async play() {}
}

class ComputerPlayerView extends PlayerView {
    constructor(player) {
        super(player);
    }

    async play() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Math.floor(Math.random() * Board.COLS));
            }, 300);
        });
    }
}

class UserPlayerView extends PlayerView {
    #columns;

    constructor(player) {
        super(player);
    }

    async play() {
        return new Promise((resolve) => {
            this.#columns = document.querySelectorAll('.column-selector');

            this.#columns.forEach(btn => btn.disabled = false);

            const onColumnClick = (event) => {
                const column = +event.target.textContent - 1;

                this.#columns.forEach(btn => {
                    btn.disabled = true;
                    btn.removeEventListener('click', onColumnClick);
                });

                resolve(column);
            };

            this.#columns.forEach(btn =>
                btn.addEventListener('click', onColumnClick)
            );
        });
    }
}

export { UserPlayerView, ComputerPlayerView }