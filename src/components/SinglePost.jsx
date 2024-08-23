import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './cards.css';
import { UserEmailContext } from './UserEmailProvider';

function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { email } = useContext(UserEmailContext);
    const navigate = useNavigate()

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

    if (!post) {
        return <div>Loading...</div>;
    }

    const handleDelete = async(_id) =>{  
            await axios.delete(`http://localhost:8080/deletePost/${_id}`)
            .then(result => {
                navigate(-1)
              })
            .catch(err => console.log(err))
       
    }
    

    return (
        <>
        <div className="card2 container-fluid m-3 row py-4" style={{width:'97%',maxHeight:'100%'}}>
        <div className='col-md-6 col-lg-4 '><img src={`http://localhost:8080/uploads/${post.file}`} className='postImg' alt="Post" style={{maxHeight:'18rem',maxWidth: "30rem"}} />
        </div>
        <div className='col-md-6 col-lg-6 offset-lg-1 top-3'>
            <div className='fs-1 text-success'>
                {post.title}
            </div>
            <div className='fs-2'>
                {post.description}
            </div>
            {email===post.email?
            <div className='fs-2 gap-2 d-flex mt-3'>
                <NavLink className="btn btn-secondary fw-medium bg-dark" to={`/edit/${post._id}`}>Edit</NavLink>
                <div className="btn btn-secondary fw-medium  bg-dark" onClick={(e) => handleDelete(post._id)}>Delete</div>
            </div>
:<></>}
        </div>
        </div>

        </>
    );
}

export default SinglePost;
