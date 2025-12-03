import {  
    FaHome,  
    FaUserFriends,  
    FaFolderOpen,  
    FaChevronDown,  
    FaUsers,  
    FaCog  
} from 'react-icons/fa'; 

import './Sidebar.css'; 
import { NavLink } from 'react-router-dom'; 
import { useState } from 'react'; 

const Sidebar = () => { 
    const [openHistorial, setOpenHistorial] = useState(false);
    const [openComite, setOpenComite] = useState(false);

    return ( 
        <div className="sidebar"> 

            <div className="sidebar-header"> 
                <div className="sena-icon"></div> 
                <h3>Comité</h3> 
            </div> 

          
            <div className="menu"> 

                <NavLink  
                    to="/inicio" 
                    className={({ isActive }) => 
                        isActive ? "sidebar-item active" : "sidebar-item" 
                    } 
                > 
                    <FaHome /> Inicio 
                </NavLink> 

                
                <button
                    className="sidebar-item"
                    onClick={() => setOpenComite(!openComite)}
                >
                    <FaUsers /> Comité
                    <FaChevronDown className={openComite ? "arrow rotated" : "arrow"} />
                </button>

                <div className={openComite ? "dropdown-content open" : "dropdown-content"}>
                    <NavLink
                        to="/comite/crear"
                        className={({ isActive }) =>
                            isActive ? "dropdown-item active" : "dropdown-item"
                        }
                    >
                        Crear Comité
                    </NavLink>

                    <NavLink
                        to="/comite/editar"
                        className={({ isActive }) =>
                            isActive ? "dropdown-item active" : "dropdown-item"
                        }
                    >
                        Editar Comité
                    </NavLink>

                    <NavLink
                        to="/comite/comites-en-curso"
                        className={({ isActive }) =>
                            isActive ? "dropdown-item active" : "dropdown-item"
                        }
                    >
                        Comites en Curso
                    </NavLink>
                </div>

                <NavLink  
                    to="/programas y aprendices" 
                    className={({ isActive }) => 
                        isActive ? "sidebar-item active" : "sidebar-item" 
                    } 
                > 
                    <FaUserFriends /> Programas y aprendices 
                </NavLink> 

                
                <button  
                    className="sidebar-item" 
                    onClick={() => setOpenHistorial(!openHistorial)} 
                > 
                    <FaFolderOpen /> 
                    Historial 
                    <FaChevronDown  
                        className={openHistorial ? "arrow rotated" : "arrow"} 
                    /> 
                </button> 

                <div className={openHistorial ? "dropdown-content open" : "dropdown-content"}> 
    <NavLink  
        to="/historial/comites"   
        className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} 
    > 
        Comités 
    </NavLink> 

    <NavLink  
        to="/historial/fichas" 
        className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} 
    > 
        Fichas 
    </NavLink> 

    <NavLink  
        to="/historial/actas" 
        className={({ isActive }) => isActive ? "dropdown-item active" : "dropdown-item"} 
    > 
        Actas 
    </NavLink> 
</div>
            </div>

            
            <div className="lower-menu"> 
                <NavLink  
                    to="/usuarios" 
                    className={({ isActive }) => 
                        isActive ? "sidebar-item active" : "sidebar-item" 
                    } 
                > 
                    <FaUsers /> Usuarios 
                </NavLink> 

                <NavLink  
                    to="/configuracion" 
                    className={({ isActive }) => 
                        isActive ? "sidebar-item active" : "sidebar-item" 
                    } 
                > 
                    <FaCog /> Configuración 
                </NavLink> 
            </div> 

            {/* Footer */} 
            <div className="sidebar-footer"> 
                <div className="footer-logo">SENA</div> 
            </div> 

        </div> 
    ); 
} 

export default Sidebar;
