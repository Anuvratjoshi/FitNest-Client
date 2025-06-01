import React from 'react'
import { Navigate } from 'react-router-dom'
//login
import Login from '../pages/Authentication/Login'
import ForgetPasswordPage from '../pages/Authentication/ForgetPassword'
import Logout from '../pages/Authentication/Logout'
import Register from '../pages/Authentication/Register'

const sessionData = sessionStorage.getItem('authUser')
const localData = localStorage.getItem('authUser')
const role =
    JSON.parse(sessionData)?.data?.role || JSON.parse(localData)?.data?.role
const authProtectedRoutes = [
    {
        path: '/',
        exact: true,
        component: (
            <Navigate
                to={
                    role === 'admin'
                        ? '/dashboard'
                        : role === 'admin'
                          ? '/superadmin-dashboard'
                          : null
                }
            />
        ),
        allowedRoles: ['admin', 'superadmin'],
    },
    {
        path: '*',
        component: (
            <Navigate
                to={
                    role === 'admin'
                        ? '/dashboard'
                        : role === 'admin'
                          ? '/superadmin-dashboard'
                          : null
                }
            />
        ),
        allowedRoles: ['admin', 'superadmin'],
    },
]

const publicRoutes = [
    // Authentication Page
    { path: '/logout', component: <Logout /> },
    { path: '/login', component: <Login /> },
    { path: '/forgot-password', component: <ForgetPasswordPage /> },
    { path: '/register', component: <Register /> },
]

export { authProtectedRoutes, publicRoutes }
