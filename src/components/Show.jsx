import React, { useContext, useEffect, useState } from 'react'
import { UserEmailContext } from './UserEmailProvider'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import './glitch.css'

function Show() {
  const { email } = useContext(UserEmailContext);
  const [posts, setPosts] = useState([]);
  const [exist, setExist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("http://localhost:8080/getPost")
        .then((result) => {
          console.log(result.data);
          setPosts(result.data);
          if (result.data.some(post => post.email === email)) {
            setExist(true);
          }
        })
        .catch((err) => {
          toast(err.message);
          console.log(err);
        });
    };
    fetch();
  }, []);

  const handleDelete = async(_id) =>{  
    await axios.delete(`http://localhost:8080/deletePost/${_id}`)
    .then(() => {
        navigate(-1)
      })
    .catch(err => console.log(err))

}

  return (
    <>
      <div
        className="container-fluid p-5 d-flex flex-wrap gap-4 justify-content-center"
        style={{
          backgroundColor: "white",
          minHeight: "80vh",
          maxHeight: "fit-content",
          backgroundSize: "cover",
          width: "99vw",
        }}
      >
        <ToastContainer />
        {exist?
        
        posts.map((post) => (
          email===post.email?
          <NavLink key={post._id} to={`/post/${post._id}`} className='post-view text-decoration-none'>
          <div className="card" style={{width: "18rem",}}>
          <img src={`http://localhost:8080/uploads/${post.file}`} style={{width: "18rem",height:'12rem'}}  className="card-img-top"/>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <div className='fs-2 gap-2 d-flex mt-3'>
                <NavLink className="btn btn-secondary fw-medium bg-dark" to={`/edit/${post._id}`}>Edit</NavLink>
                <div className="btn btn-secondary fw-medium  bg-dark" onClick={(e) => handleDelete(post._id)}>Delete</div>
            </div>
          </div>
        </div>  
        </NavLink>
      : <></>
       ))
        
      : <div className="glitch" data-text="No Post Exist !....">No Post Exist !....</div>

      
      }
      </div>
    </>
  )
}

export default Show