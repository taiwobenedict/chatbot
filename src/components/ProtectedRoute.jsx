import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { chatContext } from '../context/ChatContext'


function ProtectedRoute() {
    const {user} = useContext(chatContext)
  return (
    <div>
      {user ? <Outlet /> : <Navigate to="/login" />}
    </div>
  )
}

export default ProtectedRoute
