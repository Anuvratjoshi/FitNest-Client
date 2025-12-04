import React from 'react'
import { Navigate } from 'react-router-dom'
//login
import Login from '../pages/Authentication/Login'
import ForgetPasswordPage from '../pages/Authentication/ForgetPassword'
import Logout from '../pages/Authentication/Logout'
import Register from '../pages/Authentication/Register'
import Users from '../pages/FitNest/Admin/Manage User/Users'
import UserAnalytics from '../pages/FitNest/Admin/Manage User/Analytics'
import AdminActivity from '../pages/FitNest/Admin/Manage User/Activity'
import SubscriptionDetails from '../pages/FitNest/Admin/Subscription/Subscription Details'
import { getLoggedinUser } from '../helpers/api_helper'
// import FitnestSubscription from '../pages/FitNest/Admin/Subscription/Fitnest Subscription'
// import CardDetails from '../pages/FitNest/Admin/Subscription/Card Details'

const user = getLoggedinUser()
const role = user?.data?.role || 'guest'

const authProtectedRoutes = [
    // ***** Gym/Admin *****
    {
        path: '/admin-dashboard',
        component: <Users />,
        allowedRoles: ['admin'],
    },
    {
        path: '/user-analytics',
        component: <UserAnalytics />,
        allowedRoles: ['admin'],
    },
    {
        path: '/admin-activity',
        component: <AdminActivity />,
        allowedRoles: ['admin'],
    },
    // {
    //     path: '/admin-card-details',
    //     component: <CardDetails />,
    //     allowedRoles: ['admin'],
    // },
    // {
    //     path: '/admin-subscription',
    //     component: <FitnestSubscription />,
    //     allowedRoles: ['admin'],
    // },
    {
        path: '/admin-subscription',
        component: <SubscriptionDetails />,
        allowedRoles: ['superadmin', 'admin'],
    },
    {
        path: '/',
        exact: true,
        component: (
            <Navigate
                to={
                    role === 'admin'
                        ? '/admin-dashboard'
                        : role === 'superadmin'
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
                        ? '/admin-dashboard'
                        : role === 'superadmin'
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
