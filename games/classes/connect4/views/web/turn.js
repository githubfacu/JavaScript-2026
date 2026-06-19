
export class TurnView{

    render(turn, isPlaying) {
        const playersEs = ['Rojo', 'Amarillo']
        const turnElement = document.createElement('span')
        turnElement.innerText = `${isPlaying ? 'Turno: ' : 'Gana: '} ${playersEs[turn]}`
        return turnElement
    }
}