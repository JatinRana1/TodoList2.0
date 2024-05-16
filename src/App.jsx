import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import useAuthContext from "./hook/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    //routing
    <div className="app">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={user?<Homepage/>:<Navigate to='/login'/>}/>
            <Route path="/signUp" element={!user?<SignUp/>:<Navigate to='/'/>}/>
            <Route path="/login" element={!user?<Login/>:<Navigate to='/'/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
