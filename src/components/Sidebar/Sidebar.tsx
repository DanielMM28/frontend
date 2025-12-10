import { FaHome, FaUserFriends, FaFolderOpen, FaChevronDown, FaUsers, FaCog } from 'react-icons/fa'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = () => {
    const [openHistorial, setOpenHistorial] = useState(false)
    const [openComite, setOpenComites] = useState(false)
    const [openProgsApre, setOpenProgsApre] = useState(false)
    return (
        <div className='ui-sidebar'>
            <div className='ui-sidebar-header'>
                <div className='ui-sena-icon'>★</div>
                    <h3>Comité</h3>
                </div>
                <div className='ui-menu'>
                    <NavLink 
                    to='/inicio'
                    className={({ isActive }) => isActive ? 'ui-sidebar-item active' : 'ui-sidebar-item'}
                    >
                        <FaHome /> Inicio
                    </NavLink>
                    <button 
                        className='ui-sidebar-item'
                        onClick={() => setOpenComites(!openComite)}
                    >
                        <FaUsers />
                            Comité
                        <FaChevronDown 
                             className={openComite ? 'ui-arrow rotated' : 'ui-arrow'}
                        />
                    </button>
                    {openComite && (
                        <div className='ui-dropdown-content'>
                            <NavLink 
                            to='/comite/comites-en-curso'
                            className={({ isActive }) => isActive ? 'ui-dropdown-item active' : 'ui-dropdown-item'}
                            >
                                Comites en Curso
                            </NavLink>
                            <NavLink 
                            to='/comite/crear'
                            className={({ isActive }) => isActive ? 'ui-dropdown-item active' : 'ui-dropdown-item'}
                            >
                                Crear Comité
                            </NavLink>
                             <NavLink 
                            to='/comite/editar'
                            className={({ isActive }) => isActive ? 'ui-dropdown-item active' : 'ui-dropdown-item'}
                            >
                                Editar Comité
                            </NavLink>
                             <NavLink 
                            to='/comites/seguimientos'
                            className={({ isActive }) => isActive ? 'ui-dropdown-item active' : 'ui-dropdown-item'}
                            >
                                Seguimiento y Compromisos
                            </NavLink>

                        </div>
                    )}
                     <button 
                       className='ui-sidebar-item'
                        onClick={() => setOpenProgsApre(!openProgsApre)}
                    >
                        <FaUserFriends />
                            Programas y aprendices
                        <FaChevronDown 
                             className={openProgsApre ? 'Si-arrow rotated' : 'Si-arrow'}
                        />
                    </button>
                    {openProgsApre && (
                        <div className='ui-dropdown-content'>
                            <NavLink 
                            to='/Programas'
                            className={({ isActive }) => isActive ? 'ui-dropdown-item active' : 'ui-dropdown-item'}
                            >
                                Programas
                            </NavLink>
                            <NavLink 
                            to='/Aprendices'
                            className={({ isActive }) => isActive ? 'ui-dropdown-item active' : 'ui-dropdown-item'}
                            >
                                Aprendices
                            </NavLink>
                        </div>
                    )}
                    <button 
                        className='ui-sidebar-item'
                        onClick={() => setOpenHistorial(!openHistorial)}
                    >
                        <FaFolderOpen />
                            Historial
                        <FaChevronDown 
                             className={openHistorial ? 'ui-arrow rotated' : 'ui-arrow'}
                        />
                    </button>
                    {openHistorial && (
                        <div className='ui-dropdown-content'>
                            <NavLink 
                            to='/historial/comites'
                            className={({ isActive }) => isActive ? 'ui-dropdown-item active' : 'ui-dropdown-item'}
                            >
                                Comités
                            </NavLink>
                            <NavLink 
                            to='/historial/fichas'
                            className={({ isActive }) => isActive ? 'ui-dropdown-item active' : 'ui-dropdown-item'}
                            >
                                Fichas
                            </NavLink>
                            <NavLink 
                            to='/historial/actas'
                            className={({ isActive }) => isActive ? 'ui-dropdown-item active' : 'ui-dropdown-item'}
                            >
                                Actas
                            </NavLink>
                        </div>
                    )}
                </div>
                <div className='ui-lower-menu'>
                    <NavLink 
                    to='/usuarios'
                    className={({ isActive }) => isActive ? 'ui-sidebar-item active' : 'ui-sidebar-item'}
                    >
                        <FaUsers /> Usuarios
                    </NavLink>
                    <NavLink 
                    to='/Configuracion'
                    className={({ isActive }) => isActive ? 'ui-sidebar-item active' : 'ui-sidebar-item'}
                    >
                        <FaCog /> Configuración
                    </NavLink>
                </div>
                <div className='ui-sidebar-footer'>
                    <div className='ui-footer-logo'>SENA</div>
                </div>
            </div>
        )
}

export default Sidebar