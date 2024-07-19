import React, { useContext, useEffect, useState } from 'react'
import Logo from "../images/Logo.png"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { useAlert } from 'react-alert'
import { auth } from '../firestore';
import { useNavigate } from 'react-router-dom'
import { chatContext } from '../context/ChatContext';

function Auth() {
    const [loginState, setLoginState] = useState(true)
    const [{ email, username, password }, setFormData] = useState({ email: "", username: "", password: "" })
    const [buttonLock, setButtonLock] = useState(true)



    const alert = useAlert()
    const navigate = useNavigate()
    const { dispatch, user } = useContext(chatContext)

    function changeLoginState() {
        setLoginState(prev => (!prev))
    }

    function handleInputChange(e) {

        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))

    }

    function handleSubmit(e) {
        e.preventDefault()

        if (loginState) {
            if (email !== '' && password !== '') {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;

                        new Promise((resolve, reject) => {
                            dispatch({
                                type: "login_user",
                                payload: {
                                    id: user.uid,
                                    name: user.displayName
                                }
                            })
                            resolve(user.displayName)
                        }).then((name) => {
                            navigate('/')
                            alert.success(`Welcome back! ${name && name}`)
                        })
                        // ...
                    })
                    .catch((error) => {
                        alert.error(error.code.slice(5))
                    });

            }
        } else {

            if (email !== '' && password !== '' && username !== '') {


                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user
                        updateProfile(auth.currentUser, {
                            displayName: username,
                        }).then(() => {

                            new Promise((resolve, reject) => {
                                dispatch({
                                    type: "login_user",
                                    payload: {
                                        id: user.uid,
                                        name: user.displayName
                                    }
                                })
                                resolve()
                            }).then(() => {
                                navigate('/')
                                alert.success("Registration successful! Welcome.")
                            })

                        }).catch((error) => {
                            alert.error("Something went wrong!")
                        });

                    })
                    .catch((error) => {
                        alert.error(error.code.slice(5))

                    });

            }
        }
        setFormData({
            username: "",
            password: "",
            email: "",
        })
    }

    function checkIfUserSignedIn() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                new Promise((resolve, reject) => {
                    dispatch({
                        type: "login_user",
                        payload: {
                            id: user.uid,
                            name: user.displayName
                        }
                    })
                    resolve()
                }).then(() => {

                    navigate('/')
                })
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
    }

    useEffect(()=> {
        checkIfUserSignedIn()
    }, [])


    return (
        <div className='w-100 vh-100'>
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
                <div className="container">
                    <div className="auth-container border shadow rounded-lg p-4 w-100">
                        <div className="logo d-flex justify-content-center">
                            <div className="logo-img">
                                <img src={Logo} alt="" />
                            </div>
                        </div>
                        <h4 className="text-center text-danger mb-3">{loginState ? "Login" : "Register"}</h4>
                        <form onSubmit={handleSubmit}>
                            {
                                !loginState &&

                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" value={username} onChange={handleInputChange} className="form-control" />
                                </div>
                            }
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={handleInputChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={password} onChange={handleInputChange} className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-danger btn-block">{loginState ? "Login" : "Register"}</button>

                            <div className="mt-4 d-flex align-items-center justify-content-between">
                                <p className='m-0'>
                                    {loginState ? "Don't" : "Already"} have an account?
                                    <span className='ml-2'>{loginState ? <a href='#' onClick={changeLoginState}>Resgister</a> : <a href='#' onClick={changeLoginState}>Login</a>}</span>
                                </p>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Auth