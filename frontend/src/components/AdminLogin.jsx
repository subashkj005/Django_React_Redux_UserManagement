import React, { useState } from 'react'
import './UserLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {authenticate} from '../features/userlogin/userloginSlice'
import { useDispatch } from 'react-redux'

function AdminLogin() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const apiUrl = 'http://localhost:8000/authenticate/'

    const handleSubmit = (e) => {
        e.preventDefault()

        const adminData = {
            'username' : username,
            'password' : password
        }

        axios.post(apiUrl,adminData)
        .then((res)=>{
            
            if(res.data.message == 'superuser') {
                navigate('users')
            }
        })


    }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title"><span>Admin Login</span></div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)} required />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div><br></br></div>
          <div className="row button">
            <input type="submit" value="Login" />
          </div>
          
          <div className="signup-link">Not a member? <Link to={'signup'}>Signup now</Link></div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin