import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import './MainLayout.css';

interface Props {
  onLogout: () => void;
}

const MainLayout: React.FC<Props> = ({ onLogout }) => {
  return (
    <div className='layout-container'>
      <Sidebar />

      <div className='layout-content'>
        
        <Header onLogout={onLogout} />

        <div className='layout-page'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout;
