
import { Board } from "../../models/board.js"

export class BoardView {
    render(board) {
        const container = document.createElement('section')
        container.classList.add('board_container')

        const columnsInteractionDiv = document.createElement('div')
        columnsInteractionDiv.setAttribute('id', 'columns_interaction')
        columnsInteractionDiv.classList.add('columns_interaction')

        for (let i = 1; i <= Board.COLS; i++) {
            const columnSelector = document.createElement('button')
            columnSelector.classList.add('column-selector')
            columnSelector.textContent = i
            columnSelector.setAttribute('disabled', 'true')
            columnsInteractionDiv.appendChild(columnSelector)
        }

        container.appendChild(columnsInteractionDiv)

        const boardElement = document.createElement('div')
        boardElement.setAttribute('id', 'board')
        boardElement.classList.add('board')

        for (const row of board) {
            for (const cell of row) {
                const cellElement = document.createElement('div')
                cellElement.classList.add('cell')

                if (cell === 'Yellow') {
                    cellElement.classList.add('yellow')
                }

                if (cell === 'Red') {
                    cellElement.classList.add('red')
                }

                boardElement.appendChild(cellElement)
            }
        }

        container.appendChild(boardElement)
        return container
    }
}