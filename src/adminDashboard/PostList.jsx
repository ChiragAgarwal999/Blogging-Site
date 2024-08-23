import axios from "axios";
import React, { useEffect, useState } from "react";

function PostList() {
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        const fetchUsers =async() =>{
            await axios.get('http://localhost:8080/getPost')
            .then(response =>{
                console.log(response.data)
                setPosts(response.data);
            }).catch(err=>{
                coneole.log(err)
            })
        }
        fetchUsers();
    },[])

    const handleDelete = async(_id) =>{  
      await axios.delete(`http://localhost:8080/deletePost/${_id}`)
      .then(() => {
          console.log("Post Deleted")
           // Update posts state to remove the deleted post
           setPosts(posts.filter(post => post._id !== _id));
        })
      .catch(err => console.log(err))
  }

  return (
    <>
      <table className="table  table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">E-mail</th>
      <th scope="col">Image</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  {posts.map((post, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index+1}</th>
        <td>{post.title}</td>
        <td>{post.description}</td>
        <td>{post.email}</td>
        <td><img src={`http://localhost:8080/uploads/${post.file}`} style={{width: "5rem",height:'3rem'}}/></td>
        <td> <div className="btn btn-secondary fw-medium  bg-dark" onClick={(e) => handleDelete(post._id)}>Delete</div></td>
      </tr>
    );
  })}
  </tbody>
</table>
    </>
  );
}

export default PostList