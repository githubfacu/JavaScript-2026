
export class Board {
    static ROWS = 6
    static COLS = 7
    board = Array.from(
        { length: Board.ROWS },
        () => Array(Board.COLS).fill(null)
    )
    
    static isColumnValid(column){
        return column < 1 || column > this.COLS
    }
    
    insertToken(column, token) {
        for (let row = Board.ROWS - 1; row >= 0; row--) {
            if (this.board[row][column] === null) {
                this.board[row][column] = token

                return {
                    row,
                    column
                }
            }
        }
        return null
    }
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

            while (this.board[row]?.[column] === token) {
                count++
                row += rowStep
                column += columnStep
            }

            row = position.row - rowStep
            column = position.column - columnStep

            while (this.board[row]?.[column] === token) {
                count++
                row -= rowStep
                column -= columnStep
            }

            if (count >= 4) {
                return true
            }
        }

        return false
    }
    isComplete() {
        return this.board.every(
            row => row.every(cell => cell !== null)
        )
    }
    getBoard() {
        return this.board.map(row => [...row])
    }
}