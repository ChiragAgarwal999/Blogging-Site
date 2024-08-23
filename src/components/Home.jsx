import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import './cards.css'

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("http://localhost:8080/getPost")
        .then((result) => {
          console.log(result.data);
          setPosts(result.data);
        })
        .catch((err) => {
          toast(err.message);
          console.log(err);
        });
    };
    fetch();
  }, []);

  return (
    <>
      <div
        className="container-fluid p-5 d-flex flex-wrap gap-4 justify-content-center"
        style={{
          backgroundImage: 'linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)',
          minHeight: "80vh",
          maxHeight: "fit-content",
          backgroundSize: "cover",
          width: "99vw",
        }}
      >
        <ToastContainer />
        {posts.map((post) => (
            <NavLink key={post._id} to={`/post/${post._id}`} className='post-view text-decoration-none'>
             
                  
          <div class="card" style={{width: "18rem",}}>
          <img src={`http://localhost:8080/uploads/${post.file}`} style={{width: "18rem",height:'12rem'}}  class="card-img-top"/>
          <div class="card-body">
            <h5 class="card-title">{post.title}</h5>
            <p class="card-text">{post.description}</p>
          </div>
        </div>  
        </NavLink>
       ))}
      </div>
    </>
  );
}

export default Home;
