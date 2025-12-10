import React from 'react'
import '../Programas.css'

interface Props {
    programaId: number
    onClose: () => void
}

const ModalPrograma: React.FC<Props> = ({ programaId, onClose }) => {
    const fichas = [1, 2, 3]

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="btn-close" onClick={onClose}>
                    X
                </button>
                <h2 className="modal-title">Programa #{programaId}</h2>
                <div className="modal-section">
                    <h4>Información</h4>
                    <div className="line">a</div>
                    <div className="line-short">e</div>
                    <div className="line">i</div>
                </div>
                <div className="modal-section">
                    <h4>Fichas Asociadas</h4>
                    <div className="fichas-grid">
                    {fichas.map((f) => (
                        <div key={f} className="ficha-card">
                            <div className="line"></div>
                            <div className="line-short"></div>
                        </div>
                    ))}
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default ModalPrograma