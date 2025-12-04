import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/LoginPage.jsx';
import Inicio from './pages/Dashboard/InicioPage.jsx';
import MainLayout from './layout/MainLayout.jsx';

import HistorialFichas from './pages/Historial/Fichas/HistorialFichasPage.jsx';
import UserManagementPage from './pages/Usuarios/Usuarios.jsx';
import HistorialActasPage from './pages/Historial/Actas/Historialactas.js';
import HistorialComite from './pages/Historial/Comite/HistorialComitePage.jsx';
import ComitesEnCurso from './pages/Comite/Comitecurso.jsx';
import PerfilPage from './pages/Perfil/perfil.jsx';
import SeguiCompro from './pages/Compromisos/compromisos.tsx';
import ForgotPass from './pages/olvidar/olvidar.tsx';
import CrearComite from './pages/Comite/CrearComite.tsx';
  import UserProfile from './pages/Perfil/UserProfile.tsx';
const App = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/"; 
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
         <Route path='/forgot' element={<ForgotPass/>}/>
        <Route element={<MainLayout onLogout={handleLogout} />}>
          <Route path='/inicio' element={<Inicio />} />
          <Route path="/comite/comites-en-curso" element={<ComitesEnCurso />} />
          <Route path="/comite/crear" element={<CrearComite />} />
            
                    <Route path='/comites/seguimientos' element={<SeguiCompro/>}/>
          <Route path="/comite" element={<Navigate to="/comite/comites-en-curso" replace />} />
          <Route path='/historial/comites' element={<HistorialComite />} />
          <Route path='/historial/fichas' element={<HistorialFichas />} />
          <Route path='/historial/actas' element={<HistorialActasPage />} />
          <Route path='/usuarios' element={<UserManagementPage />} />
          <Route path="/perfil" element={<UserProfile user={{
            id: 0,
            name: '',
            lastName: '',
            rol: '',
            number: '',
            email: '',
            emailIns: '',
            direccion: '',
            avataraUrl: undefined
          }} />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
