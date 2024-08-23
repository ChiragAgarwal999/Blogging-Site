import React, { useContext, useEffect, useState } from 'react';
import { UserEmailContext } from '../components/UserEmailProvider';
import axios from 'axios';
import '../components/glitch.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './admin.css'
import './navbtn.css'
import { ToastContainer, toast } from 'react-toastify';

function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { email ,setEmail:setContextEmail} = useContext(UserEmailContext);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/${email}`);
        setIsAdmin(response.data.isAdmin);
        console.log(response.data.isAdmin);
      } catch (err) {
        console.error('Error fetching admin status:', err);
      }
    };

    if (email) {
      fetchAdminStatus();
    }
  }, [email]);

  const handleLogout = () => {
    axios.get('http://localhost:8080/logout')
      .then(() => {
        setContextEmail(null);
        localStorage.removeItem('email');
        console.log("Success");
        navigate('/');
      })
      .catch((err) => {
        toast(err.response.data)
        console.log("Error", err.message);
      });
  };

  const adminBack = {
    height: '100vh',
    backgroundImage: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
    color:'white'
  };

  const outlet ={
    backgroundImage: 'linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%)',
 backgroundBlendMode: 'normal, lighten, soft-light'
  }

  return (
    <>
    <ToastContainer />
      {isAdmin ? (
        <div className="container-fluid row" style={{padding:'0',margin:'0'}}>
          <div className=" col-3 dashboard py-3 text-center" style={adminBack}>
            <h1 className='shine fs-1'>Admin Pannel</h1>
            <hr className=''/>
            <div className='d-flex flex-column justify-content-between' style={{height: '80vh'}}>
              <div className='d-flex flex-column align-items-center'>
                 <NavLink to="/admin" className="fs-4 btn2 text-decoration-none">Dashboard</NavLink>
                 <NavLink to="/admin/adminList" className="fs-4 btn2 text-decoration-none mt-3">Admin</NavLink>
                 <NavLink to="/admin/users" className="fs-4 btn2 text-decoration-none mt-3">Users</NavLink>
                 <NavLink to="/admin/blockList" className="fs-4 btn2 text-decoration-none mt-3">Blocks</NavLink>
                 <NavLink to="/admin/postList" className="fs-4 btn2 text-decoration-none mt-3">All Posts</NavLink>
              </div>
              <div>
                  <NavLink className="btn btn-dark fs-4 p-1 px-5 mt-2" to="/">Home</NavLink>
                  <button className="btn btn-dark fs-4 p-1 px-5 mt-2" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
          <div className="col-9 outlet py-5" style={outlet}>
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column align-items-center">
          <div className="glitch text-danger" data-text="Access Denied!">Access Denied!</div>
          <div className="glitch" data-text="You are not the Owner!">You are not the Owner!</div>
        </div>
      )}
    </>
  );
}

export default Admin;
