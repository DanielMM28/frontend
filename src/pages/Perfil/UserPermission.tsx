import React from "react";
import './UserPermission.css'

interface ItemPerProps {
  permiso: string
}


const ItemPer: React.FC<ItemPerProps> = ({ permiso }) => (
  <span className="permisos-asignados">{permiso}</span>
);

const EXAMPLE = [
  "Crear comité",
  "Editar comité",
  "Cerrar acta",
  "Registrar decisiones",
  "Ver historial",
  "Ver fichas",
  "Registrar compromisos"
];

const UserPermission: React.FC = () => {
  return (
    <div className="container">
      <h2>Mis permisos</h2>
      <p className="descripcion-de-permisos">Permisos asignados a tu rol de Coordinador</p>

      <div className="listadepermisos">
        { EXAMPLE .map((permiso) => (
          <ItemPer key={permiso} permiso={permiso}></ItemPer>
        ))}
      </div>
    </div>
  )
}

export default UserPermission;

