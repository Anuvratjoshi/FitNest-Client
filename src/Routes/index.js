import React from 'react'
import { Routes, Route } from 'react-router-dom'

//Layouts
import NonAuthLayout from '../Layouts/NonAuthLayout'
import VerticalLayout from '../Layouts/index'

//routes
import { authProtectedRoutes, publicRoutes } from './allRoutes'
import { AuthProtected } from './AuthProtected'
import { useProfile } from '../Components/Hooks/UserHooks'
import { getLoggedinUser } from '../helpers/api_helper'

const Index = () => {
    const { token } = useProfile()
    const user = getLoggedinUser()
    const userRole = user?.data?.role || 'guest'

    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {!token &&
                        publicRoutes.map((route, idx) => (
                            <Route
                                path={route.path}
                                element={
                                    <NonAuthLayout>
                                        {route.component}
                                    </NonAuthLayout>
                                }
                                key={idx}
                                exact={true}
                            />
                        ))}
                </Route>

                <Route>
                    {authProtectedRoutes
                        .filter(
                            route =>
                                !route.allowedRoles ||
                                route.allowedRoles.includes(userRole),
                        )
                        .map((route, idx) => (
                            <Route
                                path={route.path}
                                element={
                                    <AuthProtected>
                                        <VerticalLayout>
                                            {route.component}
                                        </VerticalLayout>
                                    </AuthProtected>
                                }
                                key={idx}
                                exact={true}
                            />
                        ))}
                </Route>
            </Routes>
        </React.Fragment>
    )
}

export default Index
