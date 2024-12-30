import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home.jsx';
import App from '../App';
import Login from '../Pages/Login.jsx'
import Signup from '../Pages/Signup.jsx';

const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        children : [
            {
                path : "" || '/login',
                element : <Login/>
            },
            {
                path : "/signup",
                element : <Signup/>
            },{
                path : '/home',
                element : <Home/>
            }
        ]
    }
])

export default router;