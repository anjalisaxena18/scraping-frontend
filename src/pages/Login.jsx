/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setErrorMessage('Please fill in both fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/login', formData); // Adjust the backend URL
            localStorage.setItem('token', response.data.token); // Save the token
            navigate('/home'); // Redirect after login
        } catch (error) {
            console.error('Login failed', error);
            setErrorMessage('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h1 className='text-center text-2xl font-bold'>Welcome User!</h1>
                <br></br>

                <p className="text-center">Please enter your credentials</p>
                <br></br>

                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

                <form onSubmit={handleSubmit} className="mb-4">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="mb-4 p-2 w-full border rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="mb-4 p-2 w-full border rounded"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Login</button>
                </form>

                <div className='mt-4'>
                    <p className='text-center text-secondary'>Dont have an account? <a href="/signup" className='text-blue-500 hover:underline'>Sign up for free</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
