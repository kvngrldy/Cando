import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'

function Login() {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState("")
    let [status, setStatus] = useState('')

    let history = useHistory()

    function emailHandler(event) {
        setEmail(event.target.value)
    }

    function passwordHandler(event) {
        setPassword(event.target.value)
    }

    function onSubmitHandler(event) {
        event.preventDefault()
        if (!email || !password) {
            console.log("All fields are required")
        } else {
            fetch('http://localhost:3001/data/login', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
                .then(res => res.json())
                .then(data => {
                    setStatus(data)
                    console.log(data)
                    localStorage.setItem('name', data.name)
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('token', data.token)
                })
                .then(_ => {
                    history.push('/')
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="background-login">
            <div className="form-container">
                <div className="form-login">
                    <p className="account-login">ACCOUNT LOGIN</p>
                    <form onSubmit={onSubmitHandler}>
                        <input onChange={emailHandler} type="email" placeholder="Email" className="input-email" />
                        <input onChange={passwordHandler} type="password" placeholder="Password" className="input-password" /><br />
                        <input className="submit-login" type="submit" value="LOGIN" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
