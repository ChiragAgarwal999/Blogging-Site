import axios from 'axios';
import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserEmailContext } from './UserEmailProvider'; // Adjust the import based on your file structure
import { ToastContainer, toast } from 'react-toastify';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setEmail: setContextEmail } = useContext(UserEmailContext);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/login', { email, password });
      if (res.data === 'Success') {
        setContextEmail(email);
        console.log(res.data)
        const users = await axios.get('http://localhost:8080/user')
        if(users.data.some(user => user.email===email && user.isAdmin && !user.isBlock)){
          navigate('/admin')
        }else if(users.data.some(user => user.email===email && user.isBlock)){
          setContextEmail(null)
          localStorage.removeItem("email")
          navigate('/block')
        }else{
          toast('Logged In Successfully!')
          navigate('/');
        }
      } else {
        toast('Invalid Credentials')
      }
    } catch (err) {
      toast(err.response.data)
      console.log(err);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{
        backgroundImage: 'url(../Images/register.jpg)',
        backgroundSize: 'cover',
      }}
    >
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="container row col-md-3 col-sm-6 border border-secondary-subtle my-5 p-4 rounded-2 fw-bold"
        style={{ backdropFilter: 'blur(50px)', color: 'black' }}
      >
        <div className="fs-2 fw-medium text-center">Login</div>

        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary col-10 offset-1">
          Login
        </button>
        <div className="mt-2 text-center">
          <NavLink to="/register">Don't have an account</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
