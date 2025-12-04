import './Header.css';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  onLogout: () => void;
}

const Header: React.FC<Props> = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();


  const usuario = JSON.parse(localStorage.getItem("user") || "null");

  const nombre = usuario?.nombreCompleto || "Usuario";
  const rol = usuario?.rolNombre || "Sin rol";

  const titles: Record<string, string> = {
    "/inicio": "Inicio",
    "/historial": "Historial de Comités",
  };

  const title = titles[location.pathname] || "Sistema Comité";


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='header'>
      <div className='left'>
        <h2>{title}</h2>
      </div>

      <div className='right' ref={menuRef}>
        
        
        <button className='icon-btn'>
          <FaBell className='icon-btn' />
        </button>

        <div className='user-info' onClick={() => setOpen(!open)}>
          <FaUserCircle size={28} />
          <div className='user-text'>
            <span className="name">{nombre}</span>
            <span className="role">{rol}</span>
          </div>
        </div>

        
        {open && (
          <div className='dropdown'>
            <button
              className='dropdown-item'
              onClick={() => {
                setOpen(false);
                navigate("/perfil");
              }}
            >
              Mi Perfil
            </button>

            <button className='dropdown-item' onClick={onLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
