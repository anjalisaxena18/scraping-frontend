

// Showing Alert two times

/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            alert('Please log in to access this page.');  // Show alert
            navigate('/login');  // Redirect to login page smoothly
        }
    }, [token, navigate]);

    return token ? children : null;  // If no token, render nothing (handled by useEffect)
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;







































// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const PrivateRoute = ({ children }) => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token');
//     const [showAlert, setShowAlert] = useState(false);  // Manage alert display

//     useEffect(() => {
//         if (!token && !showAlert) {  // Ensure the alert runs only once
//             setShowAlert(true);  // Set flag to avoid triggering alert multiple times
//         }
//     }, [token, showAlert]);

//     useEffect(() => {
//         if (showAlert) {
//             alert('Please log in to access this page.');  // Show alert only once
//             navigate('/login');  // Redirect after the alert is acknowledged
//         }
//     }, [showAlert, navigate]);

//     return token ? children : null;  // Render children if token exists, otherwise render nothing
// };

// PrivateRoute.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default PrivateRoute;
