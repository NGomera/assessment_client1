import { useState, useEffect } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Menu = ({
  user,
  setUser,
  userIsAuthenticated,
  adminIsauthenticated,
  setUserIsAuthenticated,
  setAdminAuthenticated,
}) => {
  const [menus, setMenus] = useState([]);

  const fetchMenu = async () => {
    try {
      const MenuFetch = await fetch("http://localhost:5000/readitem", {
        headers: { token: localStorage.token },
      });
      const data = await MenuFetch.json();

      if (MenuFetch.status === 200) {
        setMenus(data);
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
      <Nav
        user={user}
        setUser={setUser}
        setAuthenticated={
          (userIsAuthenticated && setUserIsAuthenticated) ||
          (adminIsauthenticated && setAdminAuthenticated)
        }
      />

      <div className="container">
        <div className="d-flex flex-column align-items-start mt-5 mb-4">
          <div className="align-self-center">
            <video width="500px" controls>
              <source src="" type="video/mp4"></source>
            </video>
          </div>
          <div className="mt-4 mb-0 d-flex flex-column w-100">
            <h1 className="text-primary">List Authentic Filipino Cuisine</h1>
            <Link className="align-self-start btn btn-primary" to="/Add">
              Order Now
            </Link>
          </div>
        </div>

        {/* table */}
        <div className="mt-1 mb-5 container table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ITEM</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu, index) => (
                <tr key={index}>
                  <td>{menu.item_name}</td>
                  <td>{menu.item_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;
