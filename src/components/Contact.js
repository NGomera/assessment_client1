import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

const Contact = ({
  user,
  setUser,
  userIsAuthenticated,
  adminIsauthenticated,
  setUserIsAuthenticated,
  setAdminAuthenticated,
}) => {
  return (
    <>
      <Nav
        user={user}
        setUser={setUser}
        setAuthenticated={
          (userIsAuthenticated && setUserIsAuthenticated) ||
          (adminIsauthenticated && setAdminAuthenticated)
        }
      />

      <div className="container my-5">
        <div className="d-flex flex-column flex-lg-row p-5 justify-content-between align-items-center border border-1">
          <div>
            <h1 className="mb-4 text-primary">Contact Us</h1>
            <div className="">
              <div className="my-2"></div>
              <div className="my-2"></div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Email Address:{" "}
                  <span className="ms-2 fw-bold">mangandakita@gmail.com</span>
                </li>
                <li className="list-group-item">
                  Contact Number:{" "}
                  <span className="ms-2 fw-bold">
                    032-232-7520 / 0907-555-5132
                  </span>
                </li>
                <li className="list-group-item">
                  Business Address:{" "}
                  <span className="ms-2 fw-bold">
                    Km 11, Sasa, Bayview, Davao City
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-3 mt-lg-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.43128631033554!2d125.66067619585257!3d7.137494504283437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f969229d088a05%3A0x9a4c5974afbeb1dd!2sBayview%20Sasa%20Day%20care%20center!5e0!3m2!1sen!2sph!4v1643431737113!5m2!1sen!2sph"
              width="400"
              height="400"
              style={{ border: 0 }}
              allowFullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
