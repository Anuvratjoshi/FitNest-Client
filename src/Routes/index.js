import React from 'react'
import { Routes, Route } from 'react-router-dom'

//Layouts
import NonAuthLayout from '../Layouts/NonAuthLayout'
import VerticalLayout from '../Layouts/index'

//routes
import { authProtectedRoutes, publicRoutes } from './allRoutes'
import { AuthProtected } from './AuthProtected'
import { useProfile } from '../Components/Hooks/UserHooks'

const Index = () => {
    const { token } = useProfile()
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
                    {authProtectedRoutes.map((route, idx) => (
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
