import '../Programas.css'

interface Props {
    onOpen: () => void
}

const CardProgramas: React.FC<Props> = ({ onOpen }) => {
    return (
        <div className='prog-card'>
            <h3 className='prog-title'>Nombre del programa</h3>
            <div className='prog-info'>
                <div className='list-line'>Nivel:</div>
                <div className='list-short'>Duracion:</div>
                <div className='list-line'>Total Horas:</div>
                <div className='list-line'>Fichas</div>
                <button className='ver-fichas' onClick={onOpen}>
                    Ver fichas
                </button>
            </div>
        </div>
    )
}

export default CardProgramas