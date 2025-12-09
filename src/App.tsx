import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Páginas */
import Login from "./pages/Login/LoginPage.jsx";
import Inicio from "./pages/Dashboard/InicioPage.jsx";
import MainLayout from "./layout/MainLayout.jsx";

import HistorialFichas from "./pages/Historial/Fichas/HistorialFichasPage.jsx";
import UserManagementPage from "./pages/Usuarios/Usuarios.jsx";
import HistorialActasPage from "./pages/Historial/Actas/Historialactas.js";
import HistorialComite from "./pages/Historial/Comite/HistorialComitePage.jsx";
import ComitesEnCurso from "./pages/Comite/Comitecurso.jsx";
import SeguiCompro from "./pages/Compromisos/compromisos.tsx";
import ForgotPass from "./pages/olvidar/olvidar.tsx";

/* ❗ OJO: NO USES NOMBRES DE CARPETAS CON ESPACIOS */
import CrearComite from "./pages/Comite/Crearcomite/CrearComite.tsx";

import UserProfile from "./pages/Perfil/UserProfile.tsx";

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      {/* Toastify funcional en toda la app */}
      <ToastContainer position="top-right" autoClose={2500} />

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot" element={<ForgotPass />} />

        {/* Rutas privadas con layout */}
        <Route element={<MainLayout onLogout={handleLogout} />}>
          <Route path="/inicio" element={<Inicio />} />

          {/* Comités */}
          <Route path="/comite" element={<Navigate to="/comite/comites-en-curso" replace />} />
          <Route path="/comite/comites-en-curso" element={<ComitesEnCurso />} />
          <Route path="/comite/crear" element={<CrearComite />} />
          <Route path="/comite/editar" element={<CrearComite />} />
          <Route path="/comites/seguimientos" element={<SeguiCompro />} />

          {/* Historial */}
          <Route path="/historial/comites" element={<HistorialComite />} />
          <Route path="/historial/fichas" element={<HistorialFichas />} />
          <Route path="/historial/actas" element={<HistorialActasPage />} />

          {/* Usuarios */}
          <Route path="/usuarios" element={<UserManagementPage />} />

          {/* Perfil */}
          <Route
            path="/perfil"
            element={
              <UserProfile
                user={{
                  id: 0,
                  name: "",
                  lastName: "",
                  rol: "",
                  number: "",
                  email: "",
                  emailIns: "",
                  direccion: "",
                  avataraUrl: undefined,
                }}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
