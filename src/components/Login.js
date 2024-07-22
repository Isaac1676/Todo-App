// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let message = document.getElementById("message")

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/todos');
        } catch (error) {
            message.textContent = "Informations de connexion invalide !"
            setTimeout(() => {
                message.textContent = ""
            }, 3000)
            console.error("Error logging in: ", error.message);
        }
    };

    return (
        <div className='Login'>
            <h2 className='text-login'>Login</h2>
            <p id="message"></p>
            <form onSubmit={handleLogin}>
                <input className="for-login" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="for-login" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="button-login" type="submit">Login</button>
            </form>
            <h3>Nouveau ? <Link to="/register" className='link-register'>Inscrivez-vous</Link></h3>
        </div>
    );
};

export default Login;
