import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  let navigate=useNavigate();
  const url = "https://vyou.onrender.com";
  const [credentials,setCredentials]=useState({email:"",password:""});
  const onChange=(e)=>{
    setCredentials({...credentials,[e.target.id]: e.target.value})
};
  const handleSubmit=async (e)=>{
    e.preventDefault();
    //.log(JSON.stringify({email:credentials.email,password:credentials.password}))
    const response = await fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json=await response.json();
    // //.log(json)
    setCredentials({email:"",password:""})
    if(json.success===true){      
      //.log("json");
      //props.showAlert("Login successful","success");
      localStorage.setItem('token',json.authToken);
      navigate('/');
    }else{
      //alert(json.errors);
      //props.showAlert(json.errors,"danger");
      const element2 = document.getElementById('email')
    element2.classList.add('border-danger');
    const element = document.getElementById('password')
    element.classList.add('border-danger');
    }
  }
  return (
    <>
    <div>
      <h2>Login to continue:</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password"/>
  </div>
  <button type="submit" className="btn btn-dark" >Submit</button>
</form>
    </div>
    <div className="d-flex mt-4">
      <p>Don't have an account? </p>
      <Link to="/signup">Sign up</Link>
      </div>
    </>
  )
}

export default Login