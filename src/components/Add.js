import { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Add = ({ user, setUserIsAuthenticated }) => {
  const [inputs, setInputs] = useState({
    date: "",
    type: "",
    quantity: "",
  });

  const [menu, setMenu] = useState([]);
  const [price, setPrice] = useState(0);
  const [fooditem, setFooditem] = useState("");
  const selectRef = useRef();

  const { date, type, quantity } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSelectMenu = (e) => {
    if (e.target.value) {
      setFooditem(
        menu.find((food) => food.item_id === parseInt(e.target.value)).item_name
      );
      setPrice(
        menu.find((food) => food.item_id === parseInt(e.target.value))
          .item_price
      );
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (date && type && fooditem && quantity) {
        const body = {
          id: user.user_id,
          date,
          customer: `${user.user_lname}, ${user.user_fname}`,
          type,
          address: user.user_address,
          fooditem,
          quantity,
          price,
          totalamount: quantity * price,
        };

        const response = await fetch("http://localhost:5000/add", {
          method: "POST",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.status === 200) {
          setInputs({
            date: "",
            type: "",
            quantity: "",
          });
          setPrice(0);
          setFooditem("");
          selectRef.current.reset();

          toast.success("Order is Successfully added!!");
        }
      } else {
        toast.error("Fill in all Fields!");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await fetch("http://localhost:5000/readitem", {
        headers: { token: localStorage.token },
      });
      const data = await response.json();

      if (response.status === 200) {
        setMenu(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div>
      <>
        <Nav user={user} setAuthenticated={setUserIsAuthenticated} />
        <section className="bg-light pt-2">
          <div className="container px-5 my-4 px-5">
            <div className="text-center mb-4">
              <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                <i className="bi bi-envelope"></i>
              </div>
              <h2 className="fw-bolder">Submit Application For Order</h2>
              <p className="lead mb-0">Please fill-in the required fields</p>
            </div>
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-6">
                <form ref={selectRef} className="mb-4" onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      value={date}
                      className="form-control"
                      id="date"
                      type="date"
                      placeholder="date"
                      name="date"
                      onChange={handleChange}
                    />
                    <label htmlFor="date">Date</label>
                  </div>

                  <div className="form-floating mb-3">
                    <select
                      value={type}
                      className="form-select"
                      id="type"
                      name="type"
                      onChange={handleChange}
                      placeholder="type"
                    >
                      <option value="">Choose order type</option>
                      <option value="Pick-up">Pickup</option>
                      <option value="Delivery">Delivery</option>
                    </select>
                    <label htmlFor="email">Order Type</label>
                  </div>

                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      name="fooditem"
                      id="fooditem"
                      onChange={handleSelectMenu}
                    >
                      <option value="">Choose a food</option>
                      {menu &&
                        menu.map((food, index) => (
                          <option key={index} value={food.item_id}>
                            {food.item_name}
                          </option>
                        ))}
                    </select>
                    <label htmlFor="fooditem">Food item</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      value={quantity}
                      className="form-control"
                      id="quantity"
                      type="number"
                      name="quantity"
                      placeholder="quantity"
                      onChange={handleChange}
                    />
                    <label htmlFor="quantity">Quantity</label>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-lg"
                      id="submitButton"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    </div>
  );
};

export default Add;
