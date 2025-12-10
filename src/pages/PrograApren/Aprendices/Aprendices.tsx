import './Aprendices.css'

const Aprendices = () => {
    const datos = [
        {
        id: 1,
        nombre: "Carlos Pérez",
        documento: "1023456789",
        correo: "cperez@misena.edu.co",
        ficha: "2567890",
        programa: "ADSO"
        },
        {
        id: 2,
        nombre: "María López",
        documento: "987654321",
        correo: "mlopez@misena.edu.co",
        ficha: "2456700",
        programa: "Contabilidad"
        },
        {
        id: 3,
        nombre: "Juan Torres",
        documento: "123456789",
        correo: "jtorres@misena.edu.co",
        ficha: "2444500",
        programa: "Seguridad Ocupacional"
        }
    ]

    return (
        <div className='apre-container'>
            <h1 className='apre-title'>Historial de Comités</h1>
            <div className='filters-apre'>
                <div className='filter-one'>
                    <label htmlFor='filtro3'>Buscar Aprendiz:</label>
                    <input type='text' id='filtro3' className='form-control' placeholder='Buscar...'/>
                </div>
                <div className='filter-two'>
                    <label htmlFor='filtro2'>Tipo de Comite:</label>
                    <select id='filtro2' className='form-select'>
                        <option value=''>Todos</option>
                        <option value='Tecnico'>Tecnico</option>
                        <option value='Evaluacion'>Evaluacion</option>
                        <option value='Convivencia'>Convivencia</option>
                    </select>
                </div>
                <div className='filter-three'>
                    <label htmlFor='filtro4'>Fecha Limite Desde:</label>
                    <input type='date' id='filtro4' className='form-control'/>
                </div>
            </div>
            {/*Tabla de registros*/}
            <table className="table table-hover align-middle">
                <thead className="table-primary">
                <tr className='text-center'>
                    <th>Nombre</th>
                    <th>Documento</th>
                    <th>Correo</th>
                    <th>Ficha</th>
                    <th>Programa</th>
                </tr>
                </thead>
                <tbody>
                    {datos.map(a => (
                        <tr className='text-center' key={a.id}>
                            <td>{a.nombre}</td>
                            <td>{a.documento}</td>
                            <td>{a.correo}</td>
                            <td>{a.ficha}</td>
                            <td>{a.programa}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Aprendices