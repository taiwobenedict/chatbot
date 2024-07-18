import React, { useContext } from 'react'
import { Outlet , Navigate } from "react-router-dom";
import { chatContext } from '../context/ChatContext';

function ProtectRoute() {

  // const {user} = useContext(chatContext)
  const user = true;

  
  return user ? <Outlet /> : <Navigate to="/auth" />
}

export default ProtectRoute