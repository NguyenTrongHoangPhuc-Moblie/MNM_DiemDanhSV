import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from "./Header";
function Register() {
    useEffect(()=> {
        if(localStorage.getItem('user-info'))
            {
                history("/add")
            }
    }, []) 

    const [Email, setEmail] = useState("")
    const [MatKhau, setMatKhau] = useState("")
    const history = useNavigate()

    async function signUp() {
        let item = {Email, MatKhau}
        console.warn(item)

        let result = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type":'application/json',
                "Accept":'application/json'
            }
        })
        result = await result.json()
        localStorage.setItem("user-info", JSON.stringify(result))
        

    }

    return (
        <>
        <Header></Header>
        <div className="col-sm-6 offset-sm-3">
            <h1>Register Page</h1>
            <input type="text" value={Email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email"></input>
            <br />
            <input type="password" value={MatKhau} onChange={(e) => setMatKhau(e.target.value)} className="form-control" placeholder="MatKhau"></input>
            <br />
            <button onClick={signUp} className="btn btn-primary">Đăng ký</button>
        </div>
        </>
    )
}

export default Register