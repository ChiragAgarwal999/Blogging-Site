import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

function SingleUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get(`http://localhost:8080/user/${id}`).then((res) => {
        setUser(res.data);
        console.log(res.data);
      });
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:8080/getPost")
        .then((response) => {
          console.log(response.data);
          setPosts(response.data);
        })
        .catch((err) => {
          coneole.log(err);
        });
    };
    fetchPosts();
  }, []);

  const handleDelete = async (_id) => {
    await axios
      .delete(`http://localhost:8080/deletePost/${_id}`)
      .then(() => {
        console.log("Post Deleted");
        // Update posts state to remove the deleted post
        setPosts(posts.filter((post) => post._id !== _id));
      })
      .catch((err) => console.log(err));
  };

  const handelBlock = async (_id) => {
    try {
        const res = await axios.get(`http://localhost:8080/user/${_id}`);
        const isBlock = !res.data.isBlock;

        await axios.put(`http://localhost:8080/user/${_id}`, { isBlock });
        console.log(isBlock ? 'Block Successfully' : 'Unblock Successfully');
        navigate(-1);
    } catch (err) {
        console.log(err.message);
    }
};

let count=1;

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h2>Name : {user.name}</h2>
          <h3>Email : {user.email}</h3>
        </div>
        <div className="me-5">
        <button className="btn btn-danger" onClick={()=>{handelBlock(user._id)}}>Block</button>
        </div>
      </div>
      <hr className="my-4" />
      <h3>Posts by {user.name}</h3>
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
              post.email === user.email && (
                <tr key={index}>
                  <th scope="row">{count++}</th>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>{post.email}</td>
                  <td>
                    <img
                      src={`http://localhost:8080/uploads/${post.file}`}
                      style={{ width: "5rem", height: "3rem" }}
                    />
                  </td>
                  <td>
                    {" "}
                    <div
                      className="btn btn-secondary fw-medium  bg-dark"
                      onClick={(e) => handleDelete(post._id)}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
      {count==1 && <h1 className="text-center">No Post Yet!</h1>}
      <button onClick={()=>navigate(-1)} className="btn btn-primary fw-medium px-4">Back</button>
    </>
  );
}

export default SingleUser;
