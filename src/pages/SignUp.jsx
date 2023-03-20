import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import ErrorIcon from '@mui/icons-material/Error';
import '../styles/Auth.css';

const SignUp = () => {
    const error = {
        emailError: '',
        firstNameError: '',
        lastNameError: '',
    };

    return (
        <div className='auth-wrapper'>
            <Header />
            <div className='auth-container'>
                <div className='auth-title'>Sign Up</div>
                <label className={error.emailError.length > 0 ? 'error' : ''}>
                    Email Address
                    <input className={error.emailError.length > 0 ? 'error' : ''} type='text' placeholder='e.g. hello@email.com' />
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

                <label className={error.firstNameError.length > 0 ? 'error' : ''}>
                    First Name
                    <input className={error.firstNameError.length > 0 ? 'error' : ''} type='text' placeholder='' />
                    <p className='auth-error'>
                        {error.firstNameError.length > 0 ? (
                            <>
                                {error.firstNameError}
                                <ErrorIcon className='error-icon' />
                            </>
                        ) : (
                            ''
                        )}
                    </p>
                </label>

                
                <label className={error.lastNameError.length > 0 ? 'error' : ''}>
                    Last Name
                    <input className={error.lastNameError.length > 0 ? 'error' : ''} type='text' placeholder='' />
                    <p className='auth-error'>
                        {error.lastNameError.length > 0 ? (
                            <>
                                {error.lastNameError}
                                <ErrorIcon className='error-icon' />
                            </>
                        ) : (
                            ''
                        )}
                    </p>
                </label>
                <button>Sign Up</button>
            </div>
            <p className='sign-up-text'>
                Already have an account?{' '}
                <Link to='/sign-in'>
                    <span>Sign in now!</span>
                </Link>
            </p>
        </div>
    );
};

export default SignUp;
