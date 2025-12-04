import { useState } from 'react';
import './Login.css';
import LogoSena from '../../assets/sena-logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Error al iniciar sesión');
      return;
    }

    navigate('/inicio');
    localStorage.setItem("user", JSON.stringify(data.usuario));

    localStorage.setItem("token", data.token);
    
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="circles">
          <div className="circle big"></div>
          <div className="circle medium"></div>
          <div className="circle small"></div>
        </div>
        <img src={LogoSena} alt="Logo SENA" className="sena-logo" />
      </div>

    
      <div className="login-right">
        <h2>Iniciar sesión</h2>
        <p className="descripcion">
          Para acceder y brindarte la mejor experiencia...
        </p>

        {error && (
          <div className="alert alert-danger text-center w-100" role="alert">
            {error}
          </div>
        )}

        <div className="avatar"></div>

        <form onSubmit={handleSubmit} className="form-login">

          <div className="input-box">
            <input
              type="text"
              placeholder="Número de documento"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
<Link to='/forgot' className='forgot-link'>
              <a href='#'>¿Olvidaste tu contraseña'</a>
            </Link>
          <button type="submit" className="btn-login">
            Ingresar
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
