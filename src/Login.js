import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from "./Header";
function Login() {
    const history = useNavigate()
    useEffect(()=> {
        if(localStorage.getItem('user-info'))
            {
                history("/add")
            }
    }, []) 
    return (
        <div>
            <Header></Header>
            <h1>Login Page</h1>
        </div>
    )
}

export default Login