// src/components/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, auth } from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

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
            <h2 className='h2'>Register</h2>
            <form onSubmit={handleRegister}>
                <p id="message"></p>
                <input className='for-input' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className='for-input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className='for-submit' type="submit">Register</button>
            </form>
            <h3 className='h3'>Déja Inscrit ? <Link to="/login" className='link'>Connectez-vous</Link></h3>
        </div>
    );
};

export default Register;
