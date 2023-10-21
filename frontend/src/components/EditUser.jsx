import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../features/userlist/userEditSlice'
import { useNavigate, useParams } from 'react-router-dom'

function EditUser() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userid = useParams()
    const userId = userid.id
 
    const user = useSelector((state) =>
        state.userlist.users.find((user) => user.id == userId)
    );

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    
  
    useEffect(()=>{
        
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setEmail(user.email)
        
    },[])
    

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        const updatedUserData = {
          'first_name' : first_name,
          'last_name' : last_name,
          'email' : email,
        };

        dispatch(updateUser({ userId, updatedUserData }));

        navigate(-1)
      };
    

  return (
    <div className="wrapper">
    <form className="form-signin" onSubmit={handleFormSubmit} encType='multipart/form-data'>       
      <h1 className="form-signin-heading">Edit User</h1>
      <input
       type="text" 
       className="form-control" 
       name="first_name" 
       placeholder="First Name" 
       value={first_name}
       onChange={e=>setFirstName(e.target.value)} 
       required="" 
       autoFocus="" />
      <input 
      type="text" 
      className="form-control" 
      name="last_name" 
      placeholder="Last Name"
      value={last_name} 
      onChange={e=>setLastName(e.target.value)} 
      required="" 
      autoFocus="" />
      <input 
      type="text" 
      className="form-control" 
      name="email" 
      placeholder="Email Address"
      value={email} 
      onChange={e=>setEmail(e.target.value)} 
      required="" 
      autoFocus="" />
      <div className="upload-section">
        
       <div>
        <button 
        class="create-button" type="submit">Update</button>
        </div>
      </div>  
    </form>
  </div>


  )
}

export default EditUser