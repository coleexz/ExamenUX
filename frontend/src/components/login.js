import React from 'react'
import { useState } from 'react';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        alert(`username: ${username}, password: ${password}`);
    }

return (
    <div className="login-container" >
            <h1 className="titulo">Bienvenido a mi landing page</h1>
            <input className="username" type="text" placeholder="username" value={username}
            onChange={(e) => setUsername(e.target.value)} />
            <input className="password" type="password" placeholder="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <button className="button" onClick={handleLogin} >Login</button>
    </div>
    )
}

export default Login;
