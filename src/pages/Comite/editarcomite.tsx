import React, { useState } from 'react';
import './EditarComite.css'; 

interface Comite {
  id: string;
  tipo: string;
  estado: 'Pendiente' | 'Activo';
  quorum: string;
}

const DUMMY_DATA: Comite[] = [
  { id: 'ACT-2025-001', tipo: 'Comité de inicio', estado: 'Pendiente', quorum: '6/6' },
  { id: 'ACT-2025-002', tipo: 'Comité de inicio', estado: 'Activo', quorum: '3/6' },
  { id: 'ACT-2025-003', tipo: 'Comité Extraordinario', estado: 'Activo', quorum: '7/10' },
  { id: 'ACT-2025-004', tipo: 'Comité de cierre', estado: 'Pendiente', quorum: '9/10' },
  { id: 'ACT-2025-005', tipo: 'Comité de cierre', estado: 'Pendiente', quorum: '5/6' },
  { id: 'ACT-2025-006', tipo: 'Comité de inicio', estado: 'Activo', quorum: '6/6' },
  { id: 'ACT-2025-007', tipo: 'Comité Extraordinario', estado: 'Pendiente', quorum: '3/7' },
  { id: 'ACT-2025-008', tipo: 'Comité de cierre', estado: 'Pendiente', quorum: '7/7' },
  { id: 'ACT-2025-009', tipo: 'Comité Extraordinario', estado: 'Activo', quorum: '6/6' },
  { id: 'ACT-2025-010', tipo: 'Comité de inicio', estado: 'Activo', quorum: '5/6' },
];

const EditarComite: React.FC = () => {
  const [filters, setFilters] = useState({
    estado: 'Todos los estados',
    tipo: 'Todos los tipos',
    acta: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const filteredData = DUMMY_DATA.filter(item => {
    const estadoMatch = filters.estado === 'Todos los estados' || item.estado === filters.estado;
    const tipoMatch = filters.tipo === 'Todos los tipos' || item.tipo === filters.tipo;
    const actaMatch = filters.acta === '' || item.id.toLowerCase().includes(filters.acta.toLowerCase());
    return estadoMatch && tipoMatch && actaMatch;
  });

  return (
    <div className="list-wrapper">
      <div className="list-content">

        <div className="header-main">
          <div>
            <h2>Editar un comité</h2>
            <p>Modifique la información logística y los casos asignados</p>
          </div>
          
        </div>

        <div className="filter-bar">
          
          <div className="filter-group">
            <label htmlFor="estado">Estado</label>
            <select id="estado" name="estado" value={filters.estado} onChange={handleFilterChange}>
              <option>Todos los estados</option>
              <option>Activo</option>
              <option>Pendiente</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="tipo">Tipo de comité</label>
            <select id="tipo" name="tipo" value={filters.tipo} onChange={handleFilterChange}>
              <option>Todos los tipos</option>
              <option>Comité de inicio</option>
              <option>Comité de cierre</option>
              <option>Comité Extraordinario</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="acta">Buscar por acta</label>
            <input
              type="text"
              id="acta"
              name="acta"
              placeholder="Ingrese ID del acta"
              value={filters.acta}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <table className="comite-table">
          <thead>
            <tr>
              <th>ID del acta</th>
              <th>Tipo de comité</th>
              <th>Estado</th>
              
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.tipo}</td>
                <td>
                  <span className={`status-badge ${item.estado}`}>
                    {item.estado}
                  </span>
                </td>
                
                <td className="action-buttons">
                  <button>Editar</button>
                  <button>Ver historial</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          <span className="pagination-info">
            Mostrando 1 de 10 ({DUMMY_DATA.length} registros)
          </span>
          <div className="pagination-controls">
            <button>&lt;</button>
            <button className="active">1</button>
            <button>2</button>
            <button>...</button>
            <button>9</button>
            <button>10</button>
            <button>&gt;</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditarComite;