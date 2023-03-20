import { Link } from 'react-router-dom';
import { useState } from 'react';

import Header from '../components/header/Header';
import ErrorIcon from '@mui/icons-material/Error';
import '../styles/Auth.css';

const ResetPassword = () => {
    const [emailError, setEmailError] = useState('');

    const validateInputs = (e) => {
        const email = e.target.value;
        const validEmailRegex = /^\S+@\S+\.\S+$/;

        if (!email.match(validEmailRegex)) {
            setEmailError('Please enter a valid email.');
        } else {
            setEmailError('');
        }
    };

    return (
        <div className='auth-wrapper'>
            <Header />
            <div className='auth-container'>
                <div className='auth-title'>Reset Password</div>
                <label className={emailError.length > 0 ? 'error' : ''}>
                    Email Address
                    <input className={emailError.length > 0 ? 'error' : ''} type='text' placeholder='e.g. hello@email.com' onBlur={validateInputs} />
                    <p className='auth-error'>
                        {emailError.length > 0 ? (
                            <>
                                {emailError}
                                <ErrorIcon className='error-icon' />
                            </>
                        ) : (
                            ''
                        )}
                    </p>
                </label>
                <button>Send Email</button>
            </div>
            <p className='sign-up-text'>
                Never mind?{' '}
                <Link to='/sign-in'>
                    <span>Return to sign in.</span>
                </Link>
            </p>
        </div>
    );
};

export default ResetPassword;
