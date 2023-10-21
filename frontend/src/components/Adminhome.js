import React, { useEffect } from 'react'
import './Adminhome.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/userlist/userlistSlice';
import { Link } from 'react-router-dom';
import {deleteUser} from '../features/userlist/userlistSlice'
import axios from 'axios';

function Adminhome() {

  const dispatch = useDispatch()
  const users = useSelector(state=> state.userlist.users)
  const apiUrl = 'http://localhost:8000'


  useEffect(()=>{

      dispatch(fetchUsers())

  },[])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const userId = {id:id}
      axios.post(`${apiUrl}/deleteuser/`, userId)
      dispatch(deleteUser(id))
    }
  }

   
  return (
    <div className="container-xl">
    <div className="table-responsive">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row" style={{display:'flex', justifyContent :'space-between'}}>
                    <div className="col-sm-5">
                        <h2>User <b>Management</b></h2>
                    </div>
                    <div className="col-sm-7">
                        <Link style={{textDecoration:"none"}} to="createUser"><button className='button-adduser' >Add User</button></Link>
                        <Link style={{textDecoration:"none"}} to="/adminlogin"><button className='button-logout' style={{marginLeft:'1rem'}} >Logout</button></Link>
                        						
                    </div>
                    
                </div>
            </div>
            <table className="table table-striped table-hover" style={{display : 'inline'}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>						
                        <th>Email Address</th>
                        <th>Date Created</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index)=>(
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>
                              <a href="#">
                                <img 
                            className="avatar justify-content-left" 
                            style={{width:'50px', height:'50px'}} 
                            src={`${apiUrl}${user.profile_picture}`} 
                            alt="Avatar"/> 
                            {user.first_name} {user.last_name}
                            </a>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.created_at}</td>                        
                            <td>
                              <Link to={`${user.id}`}>
                                <button className='button-edit'>Edit</button>
                              </Link>
                            </td>
                            <td>
                                <button onClick={()=> handleDelete(user.id)} className="button-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    </div>
</div>


  )
}

export default Adminhome