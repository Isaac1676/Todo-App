// src/components/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css"

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/login');
        } catch (error) {
            console.error("Error registering: ", error.message);
        }
    };

    return (
        <div className='Register'>
            <h2 className='text-register'>Register</h2>
            <form onSubmit={handleRegister}>
                <p id="message"></p>
                <input className='for-register' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className='for-register' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className='button-register' type="submit">Register</button>
            </form>
            <h3>Déja Inscrit ? <Link to="/login" className='link-login'>Connectez-vous</Link></h3>
        </div>
    );
};

export default Register;
