import logo from './logo.svg';
import React, { Component, useEffect, useState }  from 'react';
import './App.css';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import memories from './images/memories.png';
import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';
import useStyles from './style.js';
import { useDispatch } from 'react-redux';
import {getPosts} from './actions/posts.js'
import Navbar from './components/Navbar';


function App() {
  const classes=useStyles();
  const dispatch=useDispatch();
  const [id,setId]=useState(null);

  useEffect(()=>{
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
    <Navbar></Navbar>
    <Form id={id} setId={setId}></Form>
    <Posts setId={setId}></Posts>
    </>
  );
}

export default App;
