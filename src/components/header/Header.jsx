import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeAuth } from '../../redux/features/authSlice';

import axios from 'axios';

import '../../styles/components/Header.css';

const initialValues = { email: '', firstName: '', lastName: '' };

const Header = () => {
    const userID = useSelector((state) => state.userAuth.userID);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(initialValues);

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [editing, setEditing] = useState(false);

    const [updatedUser, setUpdatedUser] = useState(initialValues);

    function logout() {
        localStorage.removeItem('token');
        dispatch(removeAuth());
        navigate(0);
        navigate('/');
    }

    useEffect(() => {
        if (userID) {
            axios
                .get(`http://localhost:9000/auth/${userID}`)
                .then((resp) => {
                    setUser({ email: resp.data.email, firstName: resp.data.firstName, lastName: resp.data.lastName });
                    setUpdatedUser({ email: resp.data.email, firstName: resp.data.firstName, lastName: resp.data.lastName });
                })
                .catch((err) => console.log(err));
        }
    }, []);

    function handleChanges(e) {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
        console.log(updatedUser);
        console.log(user);
    }

    function updateUserInfo() {
        axios
            .patch(`http://localhost:9000/auth/${userID}`, updatedUser)
            .then(() => {
                console.log('User Updated');
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div className='header-wrapper'>
                <header>
                    <div className='header-left'>
                        <Link to='/'>
                            <div className='header-item logo'>Car Dealership</div>
                        </Link>
                    </div>
                    <div className='header-right'>
                        {userID !== null && userID !== undefined ? (
                            <>
                                <div className='header-item dropdown-item'>
                                    <div className='profile'>
                                        {user.firstName.charAt(0)}
                                        {user.lastName.charAt(0)}
                                    </div>
                                    <div className='dropdown'>
                                        <ul>
                                            <li>
                                                {user.firstName} {user.lastName}
                                            </li>
                                            <li onClick={() => setSettingsOpen(true)}>Settings</li>
                                            <li onClick={() => logout()}>Log Out</li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to='/sign-in'>
                                    <div className='header-item header-action'>Sign In</div>
                                </Link>
                            </>
                        )}
                    </div>
                </header>
            </div>
            {settingsOpen ? (
                <div className='settings-modal-container'>
                    <div
                        className='settings-modal-tint'
                        onClick={() => {
                            setSettingsOpen(false);
                            setEditing(false);
                        }}></div>
                    <div className='settings-modal'>
                        <div className='modal-heading'>
                            <h2>Settings</h2>
                            <div
                                className='modal-close-btn'
                                onClick={() => {
                                    setSettingsOpen(false);
                                    setEditing(false);
                                }}>
                                X
                            </div>
                        </div>
                        <div className='settings-input-wrapper'>
                            <label className={editing ? 'editing' : ''}>
                                Email
                                {editing ? <input type='text' name='email' value={updatedUser.email} onChange={handleChanges} /> : <span>{user.email}</span>}
                            </label>
                        </div>

                        {editing ? (
                            <div className='settings-input-wrapper'>
                                <label className='editing'>
                                    First Name
                                    <input type='text' name='firstName' value={updatedUser.firstName} onChange={handleChanges} />
                                </label>
                                <label className='editing'>
                                    Last Name
                                    <input type='text' name='lastName' value={updatedUser.lastName} onChange={handleChanges} />
                                </label>
                            </div>
                        ) : (
                            <div className='settings-input-wrapper'>
                                <label>
                                    Name
                                    <span>
                                        {user.firstName} {user.lastName}
                                    </span>
                                </label>
                            </div>
                        )}

                        <div className='settings-input-wrapper'>
                            <label className={editing ? 'editing' : ''}>
                                {editing ? 'Current Password' : 'Password'}
                                {editing ? <input type='text' /> : <span>********</span>}
                            </label>
                        </div>
                        {editing ? (
                            <>
                                <div className='settings-input-wrapper'>
                                    <label className={editing ? 'editing' : ''}>
                                        New Password
                                        {editing ? <input type='text' /> : <span>Dylan</span>}
                                    </label>
                                </div>
                                <div className='settings-input-wrapper'>
                                    <label className={editing ? 'editing' : ''}>
                                        Confirm
                                        {editing ? <input type='text' /> : <span>Dylan</span>}
                                    </label>
                                </div>
                            </>
                        ) : (
                            ''
                        )}

                        {editing ? (
                            <div>
                                <button
                                    onClick={() => {
                                        setEditing(false);
                                        setUpdatedUser(user);
                                    }}>
                                    Cancel
                                </button>
                                <button onClick={updateUserInfo}>Save</button>
                            </div>
                        ) : (
                            <button onClick={() => setEditing(true)}>Edit</button>
                        )}
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default Header;
