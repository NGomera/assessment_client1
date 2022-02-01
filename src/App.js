import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Add from "./components/Add";
import Menu from "./components/Menu";

import p1 from "./images/Banner.png";
import p2 from "./images/BannerFoods.png";
import p3 from "./images/BannerFoods2.png";
// import v1 from "./videos/sample.mp4";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Register from "./components/Register";
import Technology from "./components/Technology";
import Contact from "./components/Contact";

function App() {
  const [user, setUser] = useState(null);
  const [adminIsauthenticated, setAdminAuthenticated] = useState(false);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const data = await response.json();

      if (response.status === 200) {
        if (data.auth && data.isAdmin) setAdminAuthenticated(true);
        else if (data.auth && !data.isAdmin) setUserIsAuthenticated(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) setUser(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [adminIsauthenticated, userIsAuthenticated]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <>
            <Nav
              user={user}
              setUser={setUser}
              setAuthenticated={
                (userIsAuthenticated && setUserIsAuthenticated) ||
                (adminIsauthenticated && setAdminAuthenticated)
              }
            />

            {/* carousel */}
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  className=""
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  className=""
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={p1} className="d-block w-100 h-50" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={p2} className="d-block w-100 h-50" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={p3} className="d-block w-100 h-50" alt="..." />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* banner */}
            <header className="bg-dark py-4">
              <div className="container px-5">
                <div className="row gx-5 justify-content-center">
                  <div className="col-lg-6">
                    <div className="text-center my-5">
                      <h1 className="display-5 fw-bolder mb-2">
                        Experience the best authentic Filipino cuisine
                      </h1>
                      <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                        <a
                          className="fs-3 btn btn-primary btn-lg mt-3 px-4 me-sm-3"
                          href="/add"
                        >
                          Order Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* feature section */}
            <section id="services" className="py-4 border-bottom" id="features">
              <div className="container p-5 d-flex flex-column flex-lg-row align-items-center">
                <div className="p-2">
                  <h1 className="h2 text-primary me-md-5">Maganda Services</h1>
                </div>
                <p className="ms-5 py-3 py-lg-0 text-dark">
                  Recognizing the dangers of the covid 19 pandemic, the people
                  behind the business thought of a way of limiting
                  person-to-person contact which is believed to be a key enabler
                  to the spread of the virus while still serving quality food to
                  its patrons. They initiated a new campaign which encourages
                  contactless transactions among customers. The food, once
                  ready, can either be picked-up in a designated area in the
                  business’ vicinity or delivered door-to-door.
                </p>
              </div>
            </section>

            <Footer />
          </>
        </Route>

        <Route path="/menu">
          <Menu
            user={user}
            setUser={setUser}
            setAuthenticated={
              (userIsAuthenticated && setUserIsAuthenticated) ||
              (adminIsauthenticated && setAdminAuthenticated)
            }
          />
        </Route>
        <Route path="/tech">
          <Technology
            user={user}
            setUser={setUser}
            setAuthenticated={
              (userIsAuthenticated && setUserIsAuthenticated) ||
              (adminIsauthenticated && setAdminAuthenticated)
            }
          />
        </Route>
        <Route path="/contactus">
          <Contact
            user={user}
            setUser={setUser}
            setAuthenticated={
              (userIsAuthenticated && setUserIsAuthenticated) ||
              (adminIsauthenticated && setAdminAuthenticated)
            }
          />
        </Route>
        <Route path="/Login">
          {!adminIsauthenticated && !userIsAuthenticated ? (
            <Login
              setAdminAuthenticated={setAdminAuthenticated}
              setUserIsAuthenticated={setUserIsAuthenticated}
            />
          ) : adminIsauthenticated ? (
            <Redirect to="/admin" />
          ) : (
            userIsAuthenticated && <Redirect to="/add" />
          )}
        </Route>
        <Route path="/register">{!userIsAuthenticated && <Register />}</Route>
        <Route path="/admin">
          {adminIsauthenticated ? (
            <Orders user={user} setAdminAuthenticated={setAdminAuthenticated} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/add">
          {!userIsAuthenticated ? (
            <Redirect to="/login" />
          ) : (
            <Add user={user} setUserIsAuthenticated={setUserIsAuthenticated} />
          )}
        </Route>
      </Switch>

      <ToastContainer theme="light" autoClose={2500} />
    </Router>
  );
}

export default App;
