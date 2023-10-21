import React, { useState } from "react";
import "./App.css";
import Adminhome from "./components/Adminhome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import UserLogin from "./components/UserLogin";
import UserHome from "./components/UserHome";
import AdminLogin from "./components/AdminLogin";
import Authcontext from "./context/Logincontext";

function App() {

  const [accessToken, setAccessToken] = useState(localStorage.getItem('authToken') ? localStorage.getItem('authToken') : "")
  const [userDecode, setUserDecode] = useState(localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : "")


  return (
    <div className="App">

    <Authcontext.Provider value={{accessToken, setAccessToken, userDecode, setUserDecode}} >

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin props={{name: 'User Login'}} />} />
          <Route path="userhome" element={<UserHome />} />
          <Route path='signup/' element={<CreateUser props={{name : 'Signup'}} />} />

          <Route path="adminlogin/" >
            <Route index element={<AdminLogin />}/>
            <Route path="users/" element={<Adminhome />}/>
            <Route path="users/createUser" element={<CreateUser props={{name : 'createuser'}} />} />
            <Route path="users/:id" element={<EditUser />} />
          </Route>
        </Routes>
      </BrowserRouter>

      </Authcontext.Provider>
    </div>
  );
}

export default App;
