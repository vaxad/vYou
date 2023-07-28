import React, { useContext, useEffect, useState } from 'react'
import Form from './Form/Form'
import Posts from './Posts/Posts'
import postContext from '../context/context'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    
  const [id,setId]=useState(null);
  const navigate=useNavigate()
  const context=useContext(postContext);
  const {me, getMe}=context;
  useEffect(()=>{
    if(localStorage.getItem('token')){
    getMe();
    }else{
      navigate('/login');
    }
  },[]);
  //.log(me);
  return !me ? (
    <Spinner/>
  ) : (
    <div>
      <p className="mx-4 h1 fh1">Welcome {me?me.name:""}</p>

    <Form id={id} setId={setId} me={me}></Form>
    <Posts setId={setId}></Posts>
    </div>
  )
}

export default Home