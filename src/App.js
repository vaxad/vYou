// import logo from './logo.svg';
import React, { useEffect }  from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import PostState from './context/state.js'
import Post from './components/Post';

function App() {

  return (
    <>
    <PostState>
    <Router>
    <Navbar/>
    {/* <Alert alert={alert}/> */}
    <div className="container mt-3">
    <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/login" element={<Login />} />
         {/* <Route exact path="/about" element={<About />} /> */}
         <Route exact path="/signup" element={<Signup />} />
         <Route exact path="/post/:id" element={<Post />} />
  </Routes>
  </div>
  </Router>
  </PostState>
  </>
  );
}

export default App;
