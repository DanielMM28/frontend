import './olvidar.css';
import { Link } from 'react-router-dom';
import LogoSena from '../../assets/sena-logo.png';

const ForgotPass = () => {
    return (
        <div className='forgot-container'>
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
            <div className='forgot-box'>
                <h2>¿Olvidaste tu contraseña?</h2>
                <p className='forgot-tex'>
                    Ingresa el correo asociado a la cuenta y te enviaremos un
                    enlace para restablecer tu contraseña.
                </p>
                <div className='inputs'>
                    <label>Correo electrónico</label>
                    <input
                    type='email'
                    placeholder='Ingresa tu correo'
                    />
                    <button className='forgot-btn'>Enviar enlace</button>
                    <Link to='/' className='back-login'>
                        ← Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass