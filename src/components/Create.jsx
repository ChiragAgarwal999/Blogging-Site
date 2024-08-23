import axios from "axios";
import React, { useContext, useState } from "react";
import { UserEmailContext } from './UserEmailProvider'; // Adjust the import based on your file structure
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



function Create() {
  const { email } = useContext(UserEmailContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email){
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('email', email);
      axios.post('http://localhost:8080/create', formData)
        .then(response => {
          navigate('/')
          toast("Post created successfully")
          console.log("Success", response.data);
        })
        .catch((err) => {
          toast(err.response.data)
          console.log("Error", err.message);
        });
    }else{
      navigate('/login')
    }
  };

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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              style={{ height: "200px" }}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
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
          <button type="submit" className="btn btn-success">
            Post
          </button>
        </form>
      </div>
    </>
  );
}

export default Create;
