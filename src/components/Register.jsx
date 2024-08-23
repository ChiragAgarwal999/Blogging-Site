import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
import { UserEmailContext } from "./UserEmailProvider";
import { ToastContainer, toast } from 'react-toastify';


function Register() {
    const[name,setName] = useState();
    const[age,setAge] = useState();
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    const navigate = useNavigate()
  const { setEmail: setContextEmail } = useContext(UserEmailContext);


    const handelSubmit =(e)=>{
        e.preventDefault();
        let passone = document.getElementById('pass')
        let passree = document.getElementById('repass')
        if (passone.value !== passree.value) {
           alert("Passwords do not match.")
          return false;
       }else{
         axios.post("http://localhost:8080/register",{name,age,email,password})
         .then(result => {
           console.log(result)
           setContextEmail(email);
           toast("Register Successfully!")
           navigate("/");
         }).catch(err => {toast(err.response.data);
         console.log(err.response.data)});
     }
       }
  return (
    <>
    <div
        className="container-fluid d-flex justify-content-center"
        style={{
          backgroundImage: "url(../Images/login.jpg)",
          backgroundSize: "cover",
        }}
      >
        <ToastContainer />
      <form onSubmit={handelSubmit} className="container row col-md-3 col-sm-6 border border-secondary-subtle my-5 p-4 rounded-2 fw-bold"
          style={{ backdropFilter: "blur(50px)", color:'black'}}>
            <div className="fs-2 fw-medium text-center">Register</div>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Name:
          </label>
          <input type="text" className="form-control" id="nameInput" name="name" onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="ageInput" className="form-label">
            Age:
          </label>
          <input type="number" className="form-control" id="ageInput" name="age"  onChange={(e)=>{setAge(e.target.value)}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email:
          </label>
          <input type="email" className="form-control" id="emailInput" name="email"  onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">
          Password:
          </label>
          <input type="password" id='pass' className="form-control" name="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="repass" className="form-label">
            Confirm Password
          </label>
          <input type="password" id='repass' className="form-control"  name="confpassword" />
        </div>
        <button type="submit"  className="btn btn-primary col-10 offset-1">
          Register
        </button>
        <div className="mt-2 text-center">
        <NavLink to='/login'>Already have an account</NavLink>
        </div>
      </form>
      </div>
    </>
  );
}

export default Register;
