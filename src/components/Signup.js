import React,{useState} from 'react';
import { useNavigate, Link } from "react-router-dom";

const Signup = (props) => {
  const element2 = document.getElementById('password')
  const element = document.getElementById('cpassword')
  let navigate=useNavigate();
  const url = "https://vyou.onrender.com";
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const onChange=(e)=>{
    // if(element.classList&&element.classList.contains('border-danger')){
    //   element.classList.remove('border-danger')
    // } 
    // if(element2.classList&&element2.classList.contains('border-danger')){
    //   element2.classList.remove('border-danger')
    // } 
    setCredentials({...credentials,[e.target.id]: e.target.value})
};
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(credentials.password===credentials.cpassword){
    const response = await fetch(`${url}/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
    });
    const json=await response.json();
    //console.log(json);
    setCredentials({name:"",email:"",password:"",cpassword:""});
    if(json.success===true){      
      localStorage.setItem('token',json.authToken);
      navigate('/');           
      //props.showAlert("Account successfully created","success");
    }else{
      //props.showAlert(json.error,"danger");
    }
  }else{
    
    element2.classList.add('border-danger');
    element.classList.add('border-danger');
    props.showAlert("Passwords dont match","danger");
  }
  }
  return (
    <>
    <div>
      <h2>Create an account: </h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Your Name</label>
    <input type="text" className="form-control" onChange={onChange} value={credentials.name} id="name"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label"> Your Email address</label>
    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Create Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credentials.password} minLength={5} required id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={onChange} value={credentials.cpassword} minLength={5} required id="cpassword"/>
  </div>
  <button type="submit" className="btn btn-dark" >Submit</button>
</form>
    </div>
    <div className="d-flex mt-4">
      <p>Already have an account? </p>
      <Link to="/login">Log in</Link>
      </div>
    </>
  )
}

export default Signup