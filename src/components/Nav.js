import React from "react";
import { Link } from "react-router-dom";
import p1 from "../images/Logo.png";
import { toast } from "react-toastify";

const Nav = ({ user, setUser, setAuthenticated }) => {
  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    localStorage.clear();
    toast.success("Logout successfully!");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-5">
        <Link className="navbar-brand" to="/">
          <img src={p1} width="65px" alt="..." />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="d-flex align-items-center navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#features">
                Services
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/menu">
                Menu
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/tech">
                Tech Stack
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/contactus">
                Contact Us
              </Link>
            </li>

            {!user && (
              <li className="nav-item">
                <Link
                  className="m-2 px-2 btn btn-primary nav-link"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <h1 className="h6 my-0 mx-3">{user.user_fname}</h1>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger my-2" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
