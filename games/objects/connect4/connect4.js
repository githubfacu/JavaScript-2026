import { ask, rl } from "../../../utils/readline.js";

(async () => {
    const connect4 = createConnetc4()
    await connect4.start()
})()

function createConnetc4() {

    function isResumed() {
        const dialog = confirmationDialogView()

        return {
            async gameResumed() {
                await dialog.read()
                return dialog.isAffirmative()
            }
        }
    }

    return {
        async start() {
            const resumed = isResumed()

            do {
                const game = gameView()
                await game.play()
            } while (await resumed.gameResumed())

            rl.close()
        }
    }
}

function gameView() {
    const game = createGame()
    const board = boardView()
    const turn = turnView()
    const player = playerView()

    return {
        async play() {
            console.log('\n\x1b[32m CONNECT 4 ▥\x1b[0m')

            do {
                board.show(game.getBoard())
                turn.show(game.getCurrentPlayer().getColor())

                let isValid

                do {
                    if (isValid === false) {
                        console.log('La columna está llena')
                    }

                    const column = await player.play()

                    isValid = game.play(column)

                } while (!isValid)

            } while (
                !game.getWinner() &&
                !game.getDraw()
            )

            board.show(game.getBoard())

            if (game.getWinner()) {
                console.log(`\nGana ${game.getWinner()}`)
            } else {
                console.log('\nEmpate')
            }
        }
    }
}

function createGame() {
    const RED = 'Red'
    const YELLOW = 'Yellow'
    const players = [createPlayer(RED), createPlayer(YELLOW)]
    const board = createBoard()
    const turn = createTurn(players.length)

    let winner = null
    let draw = false

    function drawCheck() {
        draw = board.isComplete()
    }

    return {
        play(column) {
            const currentPlayer = this.getCurrentPlayer()
            const token = currentPlayer.getColor()
            const position = board.insertToken(
                column,
                token
            )
            if (!position) {
                return false
            }
            if (board.isConnect4(position, token)) {
                winner = token
            }
            if (!winner) {
                drawCheck()
            }
            if (!winner && !draw) {
                turn.nextTurn()
            }
            return true
        },
        getBoard() {
            return board.getBoard()
        },
        getCurrentPlayer() {
            return players[turn.getTurn()]
        },
        getWinner() {
            return winner
        },
        getDraw() {
            return draw
        }
    }
}

function playerView() {

    return {
        async play() {
            let error = false
            let column

            do {
                column = await ask('Elije una columna [1 a 7]: ')
                column = Number(column)
                error = (
                    Number.isNaN(column) ||
                    column < 1 ||
                    column > 7
                )

                if (error) {
                    console.log('Por favor, ingresar una columna válida')
                }
            } while (error)
            return column - 1
        }
    };
}

function createPlayer(tokenColor) {
    const color = tokenColor

    return {
        getColor() {
            return color
        }
    }
}

function boardView() {
    return {
        show(board) {
            console.log('═════════════')
            for (const row of board) {
                console.log(
                    row.map(cell => {
                        if (cell === 'Yellow') {
                            return '\x1b[33m●\x1b[0m'
                        }

                        if (cell === 'Red') {
                            return '\x1b[31m●\x1b[0m'
                        }

                        return '.'
                    }).join(' ')
                )
            }
            console.log('═════════════')
            console.log('1 2 3 4 5 6 7')
        }
    }
}

function createBoard() {
    const ROWS = 6
    const COLS = 7

    const board = Array.from(
        { length: ROWS },
        () => Array(COLS).fill(null)
    )

    return {
        insertToken(column, token) {
            for (let row = ROWS - 1; row >= 0; row--) {
                if (board[row][column] === null) {
                    board[row][column] = token

                    return {
                        row,
                        column
                    }
                }
            }
            return null
        },
        isConnect4(position, token) {
            const directions = [
                [0, 1],
                [1, 0],
                [1, 1],
                [1, -1]
            ]

            for (const [rowStep, columnStep] of directions) {
                let count = 1

                let row = position.row + rowStep
                let column = position.column + columnStep

                while (board[row]?.[column] === token) {
                    count++
                    row += rowStep
                    column += columnStep
                }

                row = position.row - rowStep
                column = position.column - columnStep

                while (board[row]?.[column] === token) {
                    count++
                    row -= rowStep
                    column -= columnStep
                }

                if (count >= 4) {
                    return true
                }
            }

            return false
        },
        isComplete() {
            return board.every(
                row => row.every(cell => cell !== null)
            )
        },
        getBoard() {
            return board.map(row => [...row])
        }
    }
}

function turnView() {
    return {
        show(player) {
            console.log('Turno: ' + player)
        }
    }
}

function createTurn(numPlayers) {
    let turn = 0

    return {
        nextTurn() {
            turn = (turn + 1) % numPlayers
        },
        getTurn() {
            return turn
        }
    }
}

function confirmationDialog() {
    const AFFIRMATIVE = 'si'
    const NEGATIVE = 'no'
    let answer

    return {
        isAffirmative() {
            return answer === AFFIRMATIVE
        },
        isNegative() {
            return answer === NEGATIVE
        },
        setAnswer(resp) {
            answer = String(resp).toLowerCase()
        },
        getAffirmative() {
            return AFFIRMATIVE
        },
        getNegative() {
            return NEGATIVE
        }
    }
}

function confirmationDialogView() {
    const dialog = confirmationDialog()
    const affirmative = dialog.getAffirmative()
    const negative = dialog.getNegative()
    const SUFFIX = `? (` + affirmative + `/` + negative + `): `
    const MESSAGE = `Por favor, responda ${affirmative} o ${negative}`

    return {
        async read() {
            let ok
            do {
                dialog.setAnswer(await ask(SUFFIX))
                ok = dialog.isAffirmative() || dialog.isNegative()
                if (!ok) {
                    console.log(MESSAGE)

                }
            } while (!ok)
        },
        isAffirmative() {
            return dialog.isAffirmative()
        }
    }
}