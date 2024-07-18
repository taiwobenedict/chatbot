import React, { useContext, useState } from 'react'
import Logo from "../images/Logo.png"
import { chatContext } from '../context/ChatContext'
import { Navigate } from 'react-router-dom'

function Login() {
    const {signIn, user} = useContext(chatContext)

    const [screen, setScreen] = useState(false)
    const [disableBtn, setDisableBtn] = useState(true)
    const [authIntputs, setAuthInputs] = useState({
        email: "",
        password: "",
        username:""
    })

    const {email, username, password} = authIntputs
    
    function handleChange (e) {
        if (email ==="" || password === "") {
            setDisableBtn(true)
        } else {
            setDisableBtn(false)
        }

        setAuthInputs(prev => (
            {
                ...prev,
                [e.target.name] : e.target.value
            }
        ))
    }

    function handleSubmit (e) {
        e.preventDefault()

        if (e.target.id === "signIn") {
            signIn(email, password)

        } else {

        }
        
        setAuthInputs({
            email: "",
            password: "",
            username:""
        })
       
    }

    if (user) return <Navigate to="/" />
   
    return (
        <div className="container vh-100 w-100 d-flex justify-content-center align-items-center">
            <div className="border shadow rounded-lg p-4 auth-form">

                <div className="logo d-flex justify-content-center">
                    <div className="logo-img mr-2">
                        <img src={Logo} alt="" />
                    </div>
                </div>

                <h2 className="mb-4 text-center text-danger">{screen ? "Login" : "Sign Up"}</h2>

                {
                    screen
                        ? <form id='signIn' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" name='email' value={authIntputs.email} onChange={handleChange} className="form-control" placeholder='Enter email' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Password</label>
                                <input type="password" name='password' value={authIntputs.password} onChange={handleChange} className="form-control" placeholder='Enter password' />
                            </div>
                            <button type='submit' className="btn btn-danger btn-block" disabled ={disableBtn} >Login</button>
                        </form>
                        :
                        <form id='signUp' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name='username' value={authIntputs.username} onChange={handleChange} className="form-control" placeholder='Enter username' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' value={authIntputs.email} onChange={handleChange} className="form-control" placeholder='Enter email' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' value={authIntputs.password} onChange={handleChange} className="form-control" placeholder='Enter password' />
                            </div>
                            <div className="invalid-feedback">
                               
                            </div>
                            <button type='submit' className="btn btn-danger btn-block" disabled={disableBtn} >Sign Up</button>
                        </form>
                }




                {
                    screen
                        ? <div className="d-flex mt-3">
                            <p className="m-0 mr-3">Don't have an account?</p>
                            <a href="/login#" onClick={() => setScreen(prev => !prev)}>Sign Up</a>
                        </div>
                        :
                        <div className="d-flex mt-3">
                            <p className="m-0 mr-3">Already have an account?</p>
                            <a href="/login#" onClick={() => setScreen(prev => !prev)}>Login</a>
                        </div>

                }

            </div>


        </div>
    )
}

export default Login