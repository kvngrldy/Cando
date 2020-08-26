import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'
import { useDispatch } from 'react-redux'
import { setUserData } from '../store/actions/userdataActions'
import axios from 'axios'


function Login() {
    const baseUrl = 'https://candone.herokuapp.com'
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState("")
    let [status, setStatus] = useState('')
    const dispatch = useDispatch()


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
            axios({
                method: 'post',
                url: `${baseUrl}/data/login`,
                data: {
                    email, password
                }
            })
                .then(({ data }) => {

                    dispatch(setUserData(data))
                    localStorage.setItem('name', data.name)
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('imageUrl', data.imageUrl)
                    localStorage.setItem('position', data.position)
                    history.push('/')
                })
                .catch(err => {
                    alert('GAGAL LOGIN')
                })
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
