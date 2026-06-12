
export class BoardView {
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