import { useState } from 'react';
import './Login.css';
import LogoSena from '../../assets/sena-logo.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('Login:', usuario, password)
    navigate("/inicio")
  }

  return (
    <div className='login-container'>
      <div className='login-left'>
        <div className='circles'>
          <div className='circle big'></div>
          <div className='circle medium'></div>
          <div className='circle small'></div>
        </div>
        <img
          src={LogoSena}
          alt='Logo SENA'
          className='sena-logo'
        />
      </div>
      <div className='login-right'>
        <h2>Iniciar sesión</h2>
        <p className='descripcion'>
          Para acceder y brindarte la mejor experiencia para la gestión
          de los comités de manera rápida, ágil y segura.
        </p>
        <div className='avatar'></div>
        <form onSubmit={handleSubmit} className='form-login'>
          <div className='input-box'>
            <span className='icon user'></span>
            <input 
              type='text'
              placeholder='Número de documento'
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
            />
          </div>
          <div className='input-box'>
            <span className='icon lock'></span>
            <input 
              type='password'
              placeholder='Contraseña'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='extras'>
            <label style={{width:"50px", display:"flex", alignItems:"center", gap:"10px"}}>
              <input type='checkbox' />     Recuérdame
            </label>
            <Link to='/forgot' className='forgot-link'>
              <a href='#'>¿Olvidaste tu contraseña?</a>
            </Link>
          </div>
          <button type='submit' className='btn-login'>Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Login