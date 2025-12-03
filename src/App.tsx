import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/LoginPage.jsx';
import Inicio from './pages/Dashboard/InicioPage.jsx';
import MainLayout from './layout/MainLayout.jsx';

import HistorialFichas from './pages/Historial/Fichas/HistorialFichasPage.jsx';
import UserManagementPage from './pages/Usuarios/Usuarios.jsx';
import HistorialActasPage from './pages/Historial/Actas/Historialactas.js';
import HistorialComite from './pages/Historial/Comite/HistorialComitePage.jsx';
import ComitesEnCurso from './pages/Comite/Comitecurso.jsx';

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
        <Route element={<MainLayout onLogout={handleLogout} />}>
          <Route path='/inicio' element={<Inicio />} />
          <Route path="/comite/comites-en-curso" element={<ComitesEnCurso />} />
          <Route path="/comite" element={<Navigate to="/comite/comites-en-curso" replace />} />
          <Route path='/historial/comites' element={<HistorialComite />} />
          <Route path='/historial/fichas' element={<HistorialFichas />} />
          <Route path='/historial/actas' element={<HistorialActasPage />} />
          <Route path='/usuarios' element={<UserManagementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
