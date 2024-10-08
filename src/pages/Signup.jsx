/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
    });

    


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const signUpWithEmail = async (e) => {
        e.preventDefault();
        const { email, password, fullname, username } = formData;

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({ email, password, fullname, username }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('User signed up:', data);
                navigate('/login'); // Navigate to the login page on successful signup
            } else {
                console.error('Error signing up:', data.message);
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg w-full max-w-lg p-8">
                <h1 className="text-2xl font-bold text-center">Signup</h1>
                <br></br>

                <p className="text-center text-gray-600 mb-4">Create an account</p>

                <form onSubmit={signUpWithEmail}>
                    <input
                        type='text'
                        name='fullname'
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder='Full Name'
                        required
                        className="mb-4 p-2 w-full border rounded"
                    />
                    <input
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Username'
                        required
                        className="mb-4 p-2 w-full border rounded"
                    />
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email Address'
                        required
                        className="mb-4 p-2 w-full border rounded"
                    />
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Password'
                        required
                        className="mb-4 p-2 w-full border rounded"
                    />
                    
                    <button
                        type='submit'
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <a href='/login' className='text-blue-500'>Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
