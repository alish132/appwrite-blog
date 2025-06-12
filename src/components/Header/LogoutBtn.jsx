import React from 'react'
import { useDispatch } from 'react-redux';
import {logout} from '../../features/auth/authSlice'
import  authService  from "./../../appwrite/auth";

function LogoutBtn() {
    const dispatch = useDispatch()

    function handleLogout(){
      authService.logout()
      .then(() => dispatch(logout()))
    }

  return (
    <div onClick={handleLogout} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</div>
  )
}

export default LogoutBtn