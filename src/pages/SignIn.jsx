import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/header/Header';
import ErrorIcon from '@mui/icons-material/Error';
import '../styles/Auth.css';

const SignIn = () => {
    const [credentials, setCredentials] = useState({ email: 'dylan@yahoo.com', password: '123' });
    const [error, setError] = useState({ emailError: '', passwordError: '' });
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError({ ...error, [`${e.target.name}Error`]: '' });
    };

    const logUserIn = () => {
        axios
            .post('http://localhost:9000/auth/signin', credentials)
            .then((resp) => {
                localStorage.setItem('token', resp.data.token);
                navigate("/");
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className='auth-wrapper'>
            <Header />
            <div className='auth-container'>
                <div className='auth-title'>Sign In</div>
                <label className={error.emailError.length > 0 ? 'error' : ''}>
                    Email Address
                    <input className={error.emailError.length > 0 ? 'error' : ''} name='email' value={credentials.email} type='text' placeholder='e.g. hello@email.com' onChange={handleChanges} />
                    <p className='auth-error'>
                        {error.emailError.length > 0 ? (
                            <>
                                {error.emailError}
                                <ErrorIcon className='error-icon' />
                            </>
                        ) : (
                            ''
                        )}
                    </p>
                </label>

                <label className={error.passwordError.length > 0 ? 'error' : ''}>
                    Password
                    <input className={error.passwordError.length > 0 ? 'error' : ''} name='password' value={credentials.password} type='text' placeholder='' onChange={handleChanges} />
                    <p className='auth-error'>
                        {error.passwordError.length > 0 ? (
                            <>
                                {error.passwordError}
                                <ErrorIcon className='error-icon' />
                            </>
                        ) : (
                            ''
                        )}
                    </p>
                </label>
                <p className='forgot-pass-text'>
                    <Link to='/reset-password'>
                        <span>Forgot your password?</span>
                    </Link>
                </p>
                <button onClick={logUserIn}>Sign In</button>
            </div>
            <p className='sign-up-text'>
                Don't have an account?{' '}
                <Link to='/sign-up'>
                    <span>Sign up now!</span>
                </Link>
            </p>
        </div>
    );
};

export default SignIn;
