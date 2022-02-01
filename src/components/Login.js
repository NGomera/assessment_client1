import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = ({ setAdminAuthenticated, setUserIsAuthenticated }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { username, password } = inputs;

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (username && password) {
        const body = { username, password };
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.status === 200) {
          setInputs({
            username: "",
            password: "",
          });

          localStorage.setItem("token", data.token);
          toast.success("Login Successfully!");

          if (username === "admin") setAdminAuthenticated(true);
          else setUserIsAuthenticated(true);
        } else if (response.status === 403) {
          toast.error(data);
        }
      } else {
        toast.error("Fill in all fields!");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container py-2">
      <div className="my-5">
        <h1 className="text-center display-4 text-primary">Login</h1>
      </div>
      <form onSubmit={handleLogin}>
        <div className="form-floating mb-4">
          <input
            value={username}
            className="form-control"
            id="username"
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
          />
          <label htmlFor="email">Username</label>
        </div>

        <div className="form-floating mb-4">
          <input
            value={password}
            className="form-control"
            id="password"
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <label htmlFor="email">password</label>
        </div>

        <div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <div className="my-4">
            Don't have an account yet? &nbsp;
            <Link className="fw-bold text-primary no-underline" to="/register">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
