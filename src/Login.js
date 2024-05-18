import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from "./Header";
function Login() {
    const [Email, setEmail] = useState("")
    const [MatKhau, setMatKhau] = useState("")
    const history = useNavigate()
    useEffect(()=> {
        if(localStorage.getItem('user-info'))
            {
                history("/add")
            }
    }, []) 
    async function login() {
        console.warn(Email, MatKhau)
        let item = {Email, MatKhau}
        let result = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept":'application/json'
            },
            body: JSON.stringify(item)
        });
        result = await result.json()
        localStorage.setItem("user-info", JSON.stringify(result))
        history("/add")
    }
    return (
        <div>
            <Header></Header>
            <h1>Login Page</h1>
            <div className='col-sm-6 offset-sm-3'>
            <input type='text' placeholder='Email' onChange={(e) =>setEmail(e.target.value)} className='form-control' />
            <br/>
            <input type='password' placeholder='Mat khau' onChange={(e) =>setMatKhau(e.target.value)} className='form-control' />
            <br/>
            <button onClick={login} className='btn btn-primary'>Dang nhap</button>
            </div>
            
        </div>
    )
}

export default Login