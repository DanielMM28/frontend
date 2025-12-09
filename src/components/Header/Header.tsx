import './Header.css';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Props {
    onLogout: () => void
}

const Header: React.FC<Props> = ({ onLogout }) => {
    const [open, setOpen] = useState(false)

    const location = useLocation()
  const usuario = JSON.parse(localStorage.getItem("user") || "null");

  const nombre = usuario?.nombreCompleto || "Usuario";
  const rol = usuario?.rolNombre || "Sin rol";

    const titles: Record<string, string> = {
        '/inicio': 'Inicio',
        '/comites/encurso': 'Comites en Curso',
        '/comites/seguimientos': "Seguimientos y Compromisos",
        '/historial/comites': 'Registros Comites',
        '/historial/fichas': 'Registros Fichas',
    }

    const title = titles[location.pathname] || 'Sistema Comité' 

    return (
        <div className='ui-header'>
            <div className='ui-left'>
                <h2>{title}</h2>
            </div>
            <div className='ui-right'>
                <button className='ui-icon-btn'>
                <FaBell className='ui-icon-btn' />
             </button>
            <div className='ui-user-info' onClick={() => setOpen(!open)}>
                <FaUserCircle size={28} />
                <div className='user-text'>
            <span className="name">{nombre}</span>
            <br />
            <span className="role">{rol}</span>
          </div>
            </div>
            {open && (
            <div className='ui-dropdown'>
                <Link to='/perfil' className='ui-dropdown-link'>
                    <button className='ui-dropdown-item' >Mi Perfil</button>
                </Link>
                <Link to='/' className='ui-dropdown-link'>
                    <button className='ui-dropdown-item' onClick={onLogout}>Cerrar Sesión</button>
                </Link>
            </div>
            )}
        </div>
    </div>
  )
}

export default Header