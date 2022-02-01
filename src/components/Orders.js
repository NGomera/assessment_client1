import React from "react";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Nav from "./Nav";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Orders = ({ user, setAdminAuthenticated }) => {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchOrders = async () => {
    try {
      const OrdertFetch = await fetch("http://localhost:5000/read", {
        headers: { token: localStorage.token },
      });
      const data = await OrdertFetch.json();

      if (OrdertFetch.status === 200) {
        setOrders(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [refresh]);

  const handleUpdate = async (id, status) => {
    try {
      const body = { id, status };

      const response = await fetch("http://localhost:5000/edit", {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success("Record updated successfully!");
        setRefresh((prev) => !prev);
      }
    } catch (err) {
      console.error(err.messaghe);
    }
  };

  return (
    <>
      <Nav user={user} setAuthenticated={setAdminAuthenticated} />

      <div className="container">
        <div className="d-flex justify-content-between mt-5">
          <div>
            <h1 className="text-primary">List of Orders</h1>
          </div>
        </div>

        {/* table */}
        <div className="mt-3 px-0 mb-5 container table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Order Type</th>
                <th>Address</th>
                <th>Food item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_date}</td>
                  <td>{order.order_customer}</td>
                  <td>{order.order_type}</td>
                  <td>{order.order_address}</td>
                  <td>{order.order_food_item}</td>
                  <td>{order.order_quantity}</td>
                  <td>{order.order_price}</td>
                  <td>{order.order_total_amount}</td>
                  <td>{order.order_status}</td>
                  <td className="d-flex flex-column">
                    <button
                      className="mb-3 btn btn-success"
                      onClick={() => handleUpdate(order.order_id, "Done")}
                    >
                      Done
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleUpdate(order.order_id, "Being Delivered")
                      }
                    >
                      Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Orders;
