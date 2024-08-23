import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserEmailContext } from '../components/UserEmailProvider'; // Adjust the import based on your file structure
import { ToastContainer, toast } from 'react-toastify';

function Header() {
  const { email ,setEmail: setContextEmail } = useContext(UserEmailContext);
  const navigate = useNavigate()
    const bg = {
      backgroundColor:"black",
    };

    const handleLogout = () => {
      axios.get('http://localhost:8080/logout')
        .then(() => {
          setContextEmail(null);
          localStorage.removeItem('email');
          console.log("Success");
          toast('Logged Out')
          navigate('/');
        })
        .catch((err) => {
          toast(err.response.data)
          console.log("Error", err.message);
        });
    };
    return (
      <>
        <nav className="navbar navbar-expand-lg" style={bg}>
            <div className="container-fluid">
                <a className="navbar-brand">
                    <img 
                        src="https://1.bp.blogspot.com/-yIt05NVyOF0/WdYdw6FRM7I/AAAAAAAAA2c/Y8szr6n7DNwk_og9uPp8Fw1Wvz2PwAMZQCLcBGAs/s1600/Letter%2BB%2BLogo%2BDesign%2BDesign%2BTransparent%2Bfree.png" 
                        alt="Logo" 
                        width="40px"
                    />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft:'30%'}}>

        <li className="nav-item">
          <NavLink className="nav-link active mx-2 " style={{color:'white',fontWeight:'bolder', fontSize:"20px"}}aria-current="page" to="/">Dashboard</NavLink>
        </li>
        {email && (<>
        <li className="nav-item">
          <NavLink className="nav-link mx-2" style={{color:'white',fontWeight:'bolder', fontSize:"20px"}} 
          to={!email?"/login":"/create"}>Create</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link mx-2" style={{color:'white',fontWeight:'bolder', fontSize:"20px"}} 
          to={!email?"/login":"/show"}>My Post</NavLink>
        </li></>)
        }
      </ul>
                <form className="d-flex gap-2" role="search" action="#">
                  {!email?
                  <>
                  <NavLink className="btn btn-danger" type="submit" to='/register'>Register</NavLink>
                  <NavLink className="btn btn-success" type="submit" to='/login'>Login</NavLink>
                  </>:

                    <NavLink className="btn btn-success" type="submit" to='/' onClick={handleLogout}>Logout</NavLink>
                }
                </form>
    </div>
            </div>
        </nav>
            <ToastContainer/>
            </>
    );
}

export default Header;
