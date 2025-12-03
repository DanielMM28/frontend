import StatCard from '../../components/Cards/Card';
import './Inicio.css';
import { FaUsers, FaChartBar, FaFileAlt, FaCog } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <h1 className='welcome'>Hola Diana</h1>
            <p className='subtitle'>¡Bienvenida al sistema de gestión del comité!</p>

            <div className='stats-grid'>
                <StatCard title='En formación' value='7,265' subtitle='+100 este mes' />
                <StatCard title='Deserción o retiro' value='3,671' subtitle='-20%' />
                <StatCard title='Seguimiento activo' value='156' subtitle='+6' />
                <StatCard title='Comités realizados' value='17' subtitle='+2' />
            </div>

            <section className="quick-section">
                <h3>Accesos Rápidos</h3>
                <div className="quick-grid">

                    <button className="quick-btn">
                        <FaUsers size={20} />
                        Comités
                    </button>

                    
                    <NavLink 
                        to="/historial/actas"
                        className="quick-btn"
                        style={{color:"black"}}
                    >
                        <FaFileAlt size={20} />
                        Actas
                    </NavLink>

                    <button className="quick-btn">
                        <FaChartBar size={20} />
                        Reportes
                    </button>

                    <button className="quick-btn">
                        <FaCog size={20} />
                        Configuración
                    </button>
                </div>
            </section>

            <section className='recent-section'>
                <h3>Acceso Reciente</h3>
                <div className='recent-list'>
                    <div className='recent-item'>
                        <FaFileAlt />
                        <span>Acta de Comité #124</span>
                    </div>
                    <div className='recent-item'>
                        <FaUsers />
                        <span>Convocatoria Aprendiz Juan Pérez</span>
                    </div>
                    <div className='recent-item'>
                        <FaChartBar />
                        <span>Reporte disciplinario</span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;
