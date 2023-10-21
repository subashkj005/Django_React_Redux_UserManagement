import React, { useState } from 'react'
import './CreateUser.css'
import { useDispatch } from 'react-redux'
import { addUser } from '../features/userlist/addUserSlice'
import { Link, useNavigate } from 'react-router-dom'



function CreateUser(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [profile_picture, setProfilePicture] = useState(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const handleFormSubmit = async (e) => {
        e.preventDefault() 

        
        // const formData = {
        //   'first_name' : first_name,
        //   'last_name' : last_name, 
        //   'email' : email,
        //   'password' : password,
        //   'profile_picture' : profile_picture,
        // }
        // console.log(formData, 'form data');


        const formData = new FormData();

        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profile_picture', profile_picture);
        if (password == confirmPassword) {

            dispatch(addUser(formData))
            if (props.props.name == 'Signup') {
              navigate('/')
            }
            else {
              navigate(-1)
            }

        }else {
          return
        }
    }

  return (
    <div className="create-container">
    <form className="form-signin" onSubmit={handleFormSubmit} encType='multipart/form-data'>       
      <h1 className="form-signin-heading" style={{marginBottom : '10px'}}>{props.props.name}</h1>
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
      <input 
      type="password" 
      className="form-control" 
      name="password" 
      placeholder="Password"
      value={password} 
      onChange={e=>setPassword(e.target.value)} 
      required=""/>
      <input 
      type="password" 
      className="form-control" 
      name="confirmPassword" 
      placeholder="Confirm Password"
      value={confirmPassword} 
      onChange={(e)=>setConfirmPassword(e.target.value)} 
      required=""/>
      <div class="upload-section">
          <label for="profile-picture" class="file-label">
            Upload Profile Image
            <input id="profile-picture" class="upload-input" type="file" onChange={(e)=>setProfilePicture(e.target.files[0])} name="profile_picture" />
          </label>
        <div>
        <button class="create-button" type="submit">Create</button>
        <br />
        <Link to={'/'}>
        { props.props.name == 'Signup' && <button class="delete-button" type="submit">Cancel</button> }
        </Link>
      </div>
</div>
  
    </form>
  </div>
  )
}

export default CreateUser