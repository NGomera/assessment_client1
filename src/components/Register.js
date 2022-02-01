import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
    address: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { username, password, fname, lname, address } = inputs;

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      if (username && password && fname && lname && address) {
        const body = { username, password, fname, lname, address };
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.status === 200) {
          setInputs({
            username: "",
            password: "",
            fname: "",
            lname: "",
            address: "",
          });

          localStorage.setItem("token", data.token);
          toast.success("Register successfully!");
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
        <h1 className="text-center display-4 text-primary">Register</h1>
      </div>
      <form onSubmit={handleRegister}>
        <div className="d-flex">
          <div className="w-50  form-floating mb-4 me-4">
            <input
              value={fname}
              className="form-control"
              id="fname"
              type="text"
              placeholder="First Name"
              name="fname"
              onChange={handleChange}
            />
            <label htmlFor="fname">First Name</label>
          </div>

          <div className="w-50 form-floating mb-4">
            <input
              value={lname}
              className="form-control"
              id="lname"
              type="text"
              placeholder="Last Name"
              name="lname"
              onChange={handleChange}
            />
            <label htmlFor="lname">Last Name</label>
          </div>
        </div>

        <div className="form-floating mb-4">
          <input
            value={address}
            className="form-control"
            id="address"
            type="text"
            placeholder="Address"
            name="address"
            onChange={handleChange}
          />
          <label htmlFor="address">Address</label>
        </div>

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
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-floating mb-4">
          <input
            value={password}
            className="form-control"
            id="email"
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <label htmlFor="email">Password</label>
        </div>

        <div>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
          <div className="my-4">
            Already have an account? &nbsp;
            <Link className="fw-bold text-primary no-underline" to="/login">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
