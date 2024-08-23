import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Edit() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [post,setPost] = useState({})
    const [file, setFile] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/getPost/${id}`);
                console.log(result.data);
                setPost(result.data);
            } catch (err) {
                toast(err.message);
                console.log(err);
            }
        };
        fetch();
    }, []);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('description', post.description);
        if (file) {
            formData.append('file', file);
        }

        try {
            await axios.put(`http://localhost:8080/editPost/${id}`, formData);
            navigate(-1);
        } catch (error) {
            console.error('Error updating post:', error);
            toast.error('Failed to update post');
        }
    };

      
      const handleChange = (e) =>{
        const {name,value} = e.target
        setPost((pre) =>({
            ...pre,[name]:value
        }))
      }


  return (
    <>
    <div
      className="container-fluid d-flex justify-content-center"
      style={{
        backgroundImage: "url(../Images/create.jpg)",
        backgroundSize: "cover",
      }}
    >
       <ToastContainer />
      <form onSubmit={handleSubmit}
        className="container row col-6 border border-secondary-subtle my-5 p-4 rounded-2"
        style={{ backdropFilter: "blur(50px)" }}
      >
        <div className="fs-3 fw-medium">Create Post</div>
        <div className="my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            style={{ height: "200px" }}
            name="description"
            value={post.description}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="floatingTextarea2">Enter Description</label>
        </div>
        <div className="my-3">
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div>
        <img src={`http://localhost:8080/uploads/${post.file}`} style={{width: "12rem",height:'8rem'}}  className=" my-4"/>
        </div>
        <button type="submit" className="btn btn-success">
          Post
        </button>
      </form>
    </div>
  </>
  )
}

export default Edit