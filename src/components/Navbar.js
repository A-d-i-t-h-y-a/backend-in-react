import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    const handleLogout = ()=>{
        localStorage.removeItem("token")
        props.showAlert("LoggedOut Successfully", "success")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token")?<form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
                        </form>:<Link className="btn btn-primary mx-1" to="/login" role="button" onClick={handleLogout}>LogOut</Link>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
