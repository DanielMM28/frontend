import './Header.css';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
    onLogout: () => void
}

const Header: React.FC<Props> = ({ onLogout }) => {

    const [open, setOpen] = useState(false);
    const location = useLocation();

    // 👉 Leer el usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem("user") || "{}");

    const nombreCompleto = `${usuario.usuNom || ""} ${usuario.usuApe || ""}`;
    const rol = usuario.rol?.rolDes || "Sin rol";

    const titles: Record<string, string> = {
        "/inicio": "Inicio",
        "/historial": "Historial de Comités",
        "/casos": "Gestión de Casos",
        "/actas": "Actas",
        "/aprendices": "Aprendices"
    };

    const title = titles[location.pathname] || "Sistema Comité";

    return (
        <div className='header'>
            <div className='left'>
                <h2>{title}</h2>
            </div>

            <div className='right'>
                <button className='icon-btn'>
                    <FaBell className='icon-btn' />
                </button>

                <div className='user-info' onClick={() => setOpen(!open)}>
                    <FaUserCircle size={28} />
                    
                </div>

                {open && (
                    <div className='dropdown'>
                        <button className='dropdown-item'>Mi Perfil</button>
                        <button className='dropdown-item' onClick={onLogout}>Cerrar Sesión</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
