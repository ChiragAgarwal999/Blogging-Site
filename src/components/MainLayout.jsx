import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../include/Header'
import Footer from '../include/Footer'
import { ToastContainer } from 'react-toastify'
// import { UserEmailContext } from './UserEmailProvider'; 
function MainLayout() {
  // const { email } = useContext(UserEmailContext);
  return (
    <div>
        <Header/>
        <ToastContainer />
        <Outlet/> 
        <Footer/>
    </div>
  )
}

export default MainLayout