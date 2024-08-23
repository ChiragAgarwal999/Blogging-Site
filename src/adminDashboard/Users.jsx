import axios from "axios";
import React, { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom'

function Users() {
    const [users,setUsers] = useState([])

    useEffect(()=>{
        const fetchUsers =async() =>{
            await axios.get('http://localhost:8080/user')
            .then(response =>{
                console.log(response.data)
                setUsers(response.data);
            }).catch(err=>{
                coneole.log(err)
            })
        }
        fetchUsers();
    },[])

    const handleRoll = async (_id, e) => {
      try {
          const roll = e.target.value;
          const isAdmin = roll === 'Admin';

          await axios.put(`http://localhost:8080/user/${_id}`, { isAdmin });

          console.log('Successfully role is changed to: ' + roll);
          setUsers(users.map(user => (user._id === _id ? { ...user, isAdmin } : user)));
      } catch (err) {
          console.log(err.message);
      }
  };
    
    const handelBlock = async (_id) => {
      try {
          const res = await axios.get(`http://localhost:8080/user/${_id}`);
          const isBlock = !res.data.isBlock;

          await axios.put(`http://localhost:8080/user/${_id}`, { isBlock });

          console.log(isBlock ? 'Block Successfully' : 'Unblock Successfully');
          setUsers(users.map(user => (user._id === _id ? { ...user, isBlock } : user)));
      } catch (err) {
          console.log(err.message);
      }
  };

  let counts=1;

  return (
    <>
      <table className="table  table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Roll</th>
      <th scope="col">Blocked</th>
      <th scope="col">Detail</th>
    </tr>
  </thead>
  <tbody>
  {users.map((user, index) => {
    return (
      !user.isAdmin && !user.isBlock && (
      <tr key={index}>
        <th scope="row">{counts++}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td >
          <select className="form-select bg text-light" onChange={(e)=>{handleRoll(user._id,e)}} style={{width:'6rem',backgroundColor:user.isAdmin ? "green":"grey"}} aria-label="Default select example" defaultValue={user.isAdmin ? "Admin":"User"}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
      </td>
        <td>{!user.isBlock?<><button className="btn btn-danger" onClick={()=>{handelBlock(user._id)}}>Block</button></>:<><button className="btn btn-secondary" onClick={()=>{handelBlock(user._id)}}>Unblock</button></>}</td>
        <td><NavLink to={`/admin/user/${user._id}`} className="btn btn-dark">Detail</NavLink></td>
      </tr>
      )
    );
  })}
  </tbody>
</table>
    </>
  );
}

export default Users;
