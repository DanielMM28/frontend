import { useState } from 'react'
import CardProgramas from './CardProgramas/CardProgramas'
import ModalProgramas from './ModalProgramas/ModalPrograma'
import './Programas.css'

const Programas = () => {
    const programas = [1, 2, 3, 4, 5]

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedPrograma, setSelectedPrograma] = useState<number | null>(null)

    const abrirModal = (id: number) => {
        setSelectedPrograma(id)
        setModalOpen(true)
    }
    const cerrarModal = () => {
        setModalOpen(false)
        setSelectedPrograma(null)
    }

    return (
        <div className='progs-container'>
            <h2 className='title'>Programas</h2>
            <div className='filters-prog'>
                <div className='filter-one'>
                    <label htmlFor='filtro1'>Busqueda por Programa:</label>
                    <input type='text' id='filtro1' className='form-control' placeholder='Buscar...'/>
                </div>
                <div className='filter-two'>
                    <label htmlFor='filtro2'>Nivel:</label>
                    <select id='filtro2' className='form-select'>
                        <option value=''>Todos</option>
                        <option value='Pendiente'>Tecnico</option>
                        <option value='Cerrada'>Tecnologo</option>
                    </select>
                </div>
            </div>
            <div className='prog-grid'>
                {programas.map((p) => (
                <CardProgramas key={p} onOpen={() => abrirModal(p)}/>
                ))}
            </div>
            {modalOpen && (
                <ModalProgramas programaId={selectedPrograma!} onClose={cerrarModal} />
            )}
        </div>
    )
}

export default Programas