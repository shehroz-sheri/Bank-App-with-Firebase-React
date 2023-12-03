import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../../Context/AuthContext'
import { Outlet } from 'react-router-dom/dist'

const PrivateRoute = () => {
    const firebase = useFirebase()
    const user = firebase.isLoggedIn;

    return (
        user ? <Outlet/> : <Navigate to='/auth/login'/>
    )
}

export default PrivateRoute