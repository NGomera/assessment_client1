import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Technology = ({
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
        <div>
          <h1 className="mb-4 text-primary">Technology Stack</h1>
        </div>

        <div className="p-4 border border-1">
          <div>
            <div className="text-primary">
              <h2 className="mb-3">Front-End: </h2>
            </div>
            <div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <code>HTML - Hyper Text Markup Language</code>
                </li>
                <li className="list-group-item">
                  <code>CSS - Cascading Style Sheets</code>
                </li>
                <li className="list-group-item">
                  <code>JS - Javascript - React</code>
                </li>
                <li className="list-group-item">
                  <code>Bootstrap</code>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-primary">
              <h2 className="mb-3">Back-End: </h2>
            </div>
            <div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <code>Node JS - Express</code>
                </li>
                <li className="list-group-item">
                  <code>Database - PostresSQL</code>
                </li>
                <li className="list-group-item"></li>
              </ul>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-primary">
              <h2 className="mb-3">Cloud Services: </h2>
            </div>
            <div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <code>Heroku</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Technology;
