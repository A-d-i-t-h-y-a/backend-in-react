import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const [credentials, setCredentials] = useState({email:"", password: ""})
    let history = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`https://inotebookapi.onrender.com/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json)
        const userdata = await fetch(`https://inotebookapi.onrender.com/api/auth/getuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': json.authToken
            }
        });
        const data = await userdata.json();
        console.log(data)
        if(json.success){
            localStorage.setItem("token", json.authToken)
            history("/");
            props.showAlert("Loggedin Successfully", "success")
            setTimeout(() => {
                props.showAlert(`Welcome Back ${data.name}`, "success")
            }, 1500);
        }
        else{
            props.showAlert("Enter Valid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h1>Login to Continue to iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email'value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"value={credentials.password} name='password' id="password" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
