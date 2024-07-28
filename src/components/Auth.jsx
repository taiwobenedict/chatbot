import React, { useContext, useEffect, useState } from 'react';
import Logo from '../images/Logo.png';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged, 
    sendPasswordResetEmail 
} from 'firebase/auth';
import { useAlert } from 'react-alert';
import { auth } from '../firestore';
import { useNavigate } from 'react-router-dom';
import { chatContext } from '../context/ChatContext';

function Auth() {
    const [loginState, setLoginState] = useState('login');
    const [formData, setFormData] = useState({ email: '', username: '', password: '' });
    const [errorMessages, setErrorMessages] = useState({ emailErr: '', usernameErr: '', passwordErr: '' });

    const alert = useAlert();
    const navigate = useNavigate();
    const { dispatch } = useContext(chatContext);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrorMessages({ emailErr: '', usernameErr: '', passwordErr: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password, username } = formData;

        if (loginState === 'login') {
            if (!email || !password) {
                setErrorMessages({
                    emailErr: !email ? 'Please provide your email' : '',
                    passwordErr: !password ? 'Please enter your password' : ''
                });
                return;
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                dispatch({
                    type: 'login_user',
                    payload: {
                        id: user.uid,
                        name: user.displayName
                    }
                });

                navigate('/');
                alert.success(`Welcome back! ${user.displayName}`);
            } catch (error) {
                alert.error(error.code.slice(5));
            }
        } else if (loginState === 'register') {
            if (!email || !password || !username) {
                setErrorMessages({
                    emailErr: !email ? 'Please provide your email' : '',
                    passwordErr: !password ? 'Please enter your password' : '',
                    usernameErr: !username ? 'Please provide your username' : ''
                });
                return;
            }

            if (password.length < 6) {
                setErrorMessages(prev => ({ ...prev, passwordErr: 'Password must not be less than 6 characters' }));
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await updateProfile(auth.currentUser, { displayName: username });

                dispatch({
                    type: 'login_user',
                    payload: {
                        id: user.uid,
                        name: user.displayName
                    }
                });

                navigate('/');
                alert.success('Registration successful! Welcome.');
            } catch (error) {
                alert.error(error.code.slice(5));
            }
        } else if (loginState === 'forget-password') {
            if (!email) {
                setErrorMessages({ emailErr: 'Please provide your email' });
                return;
            }

            try {
                await sendPasswordResetEmail(auth, email);
                alert.success('Reset password has been sent to your email.', {
                    timeout: 0,
                    onClose: () => setLoginState('login')
                });
            } catch (error) {
                alert.error(error.code.slice(5));
            }
        }

        setFormData({ email: '', username: '', password: '' });
    };

    useEffect(() => {
        const checkIfUserSignedIn = async () => {
            onAuthStateChanged(auth, user => {
                if (user) {
                    dispatch({
                        type: 'login_user',
                        payload: {
                            id: user.uid,
                            name: user.displayName
                        }
                    });
                    navigate('/');
                }
            });
        };
        
        checkIfUserSignedIn();
    }, [dispatch, navigate]);

    const { email, username, password } = formData;
    const { emailErr, passwordErr, usernameErr } = errorMessages;

    return (
        <div className='w-100 vh-100'>
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div className="container">
                    <div className="auth-container border shadow rounded-lg p-4 w-100">
                        <div className="logo d-flex justify-content-center">
                            <div className="logo-img">
                                <img src={Logo} alt="Logo" />
                            </div>
                        </div>
                        <h4 className="text-center text-danger mb-3">
                            {loginState === 'login' ? 'Login' : loginState === 'register' ? 'Register' : 'Reset Password'}
                        </h4>
                        <form onSubmit={handleSubmit}>
                            {loginState === 'register' && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={handleInputChange}
                                            className={`form-control ${usernameErr && 'is-invalid'}`}
                                        />
                                        <div className="invalid-feedback">{usernameErr}</div>
                                    </div>
                                </>
                            )}
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    className={`form-control ${emailErr && 'is-invalid'}`}
                                />
                                <div className="invalid-feedback">{emailErr}</div>
                            </div>
                            {loginState !== 'forget-password' && (
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={handleInputChange}
                                        className={`form-control ${passwordErr && 'is-invalid'}`}
                                    />
                                    <div className="invalid-feedback">{passwordErr}</div>
                                </div>
                            )}
                            <button type="submit" className="btn btn-danger btn-block">
                                {loginState === 'login' ? 'Login' : loginState === 'register' ? 'Register' : 'Reset Password'}
                            </button>
                            <div className="mt-4 d-flex align-items-center justify-content-between">
                                <p className='m-0'>
                                    {loginState === 'login' ? "Don't" : 'Already'} have an account?
                                    <span className='ml-2'>
                                        {loginState === 'login' ? (
                                            <a href='/#/auth' onClick={() => setLoginState('register')}>Register</a>
                                        ) : (
                                            <a href='/#/auth' onClick={() => setLoginState('login')}>Login</a>
                                        )}
                                    </span>
                                </p>
                                {loginState === 'login' && (
                                    <a href='/#/auth' onClick={() => setLoginState('forget-password')}>Forgot Password?</a>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
