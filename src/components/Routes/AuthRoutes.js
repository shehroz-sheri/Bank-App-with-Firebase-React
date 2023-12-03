import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../../Context/AuthContext'
import { Outlet } from 'react-router-dom/dist'

const AuthRoutes = () => {
    const firebase = useFirebase()
    const user = firebase.isLoggedIn;

    return (
        !user ? <Outlet/> : <Navigate to='/'/>
    )
}

export default AuthRoutes