import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate();
  const handleLogout=()=>{
  navigate('/login');
  }
  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand fh1" href="/">vYou</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#"></a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2 fh2" disabled={true} type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-light fh2" disabled={true} type="submit">Search</button>
        <button className="btn btn-outline-light mx-2 nav-item fh2" style={{whiteSpace:'nowrap'}} onClick={handleLogout}>Log out</button>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar