import { FaSearch, FaEllipsisV } from 'react-icons/fa';

const SeguiCompro = () => {
    // Datos de ejemplo para las filas de la tabla
    const compromisosData = [
        {
            id: '01',
            aprendiz: 'Juan Pérez',
            compromiso: 'Presentar evidencia del proyecto',
            fechaLimite: '10/12/2025',
            estado: 'Pendiente',
            claseEstado: 'bg-warning text-dark'
        },
        {
            id: '02',
            aprendiz: 'María López',
            compromiso: 'Asistir a tutoría disciplinaria',
            fechaLimite: '05/12/2025',
            estado: 'Cumplido',
            claseEstado: 'bg-success'
        },
        {
            id: '03',
            aprendiz: 'Carlos Gómez',
            compromiso: 'Ajustar planeación pedagógica',
            fechaLimite: '20/12/2025',
            estado: 'Vencido',
            claseEstado: 'bg-danger'
        },
        {
            id: '04',
            aprendiz: 'Ana Torres',
            compromiso: 'Entregar informe de seguimiento',
            fechaLimite: '15/01/2026',
            estado: 'Pendiente',
            claseEstado: 'bg-warning text-dark'
        },
        {
            id: '05',
            aprendiz: 'Luisa Castro',
            compromiso: 'Revisión de caso con coordinador',
            fechaLimite: '01/12/2025',
            estado: 'Cumplido',
            claseEstado: 'bg-success'
        },
    ];

    return (
        <div className='container mt-4'>
            <h1 className='mb-4 text'>Seguimientos y Compromisos</h1>
            
            {/* --- Sección de Búsqueda y Filtros --- */}
            <div className='row mb-4'>
                {/* Caja de Búsqueda */}
                <div className='col-md-8'>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaSearch />
                        </span>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Buscar por aprendiz o caso..."
                            aria-label="Buscar" // Accesibilidad
                        />
                    </div>
                </div>
                
                {/* Botón de Filtro */}
                <div className='col-md-4 d-grid'>
                    <button className='btn btn-outline-secondary'>
                        Filtrar por Estado
                    </button>
                </div>
            </div>
            
            {/* --- Tabla de Registros --- */}
            <div className="table-responsive">
                <table className='table table-striped table-hover align-middle'>
                    <thead className='table-dark'>
                        <tr>
                            <th>ID</th>
                            <th>Aprendiz</th>
                            <th>Compromiso</th>
                            <th>Fecha límite</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compromisosData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.aprendiz}</td>
                                <td>{item.compromiso}</td>
                                <td>{item.fechaLimite}</td>
                                <td>
                                    {/* Uso de la clase dinámica para el Badge de Bootstrap */}
                                    <span className={`badge ${item.claseEstado}`}>
                                        {item.estado}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-secondary" title="Opciones">
                                        <FaEllipsisV />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SeguiCompro;