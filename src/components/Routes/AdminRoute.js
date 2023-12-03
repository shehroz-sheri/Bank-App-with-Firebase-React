import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../../Context/AuthContext'
import { Outlet } from 'react-router-dom/dist'

const AdminRoute = () => {
    const firebase = useFirebase()

    return (
        firebase.user.email ? <Outlet/> : <Navigate to='/'/>
    )
}

export default AdminRoute