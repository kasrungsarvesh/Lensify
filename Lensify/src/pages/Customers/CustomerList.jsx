import { useEffect, useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./CustomerList.css";

import {
  getAllCustomers,
  searchCustomers,
  deleteCustomer,
} from "../../api/customerApi";

import { successToast, errorToast } from "../../utils/toast";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await getAllCustomers();

      setCustomers(response.data.data);
    } catch (error) {
      console.error(error);

      errorToast("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    const keyword = value.trim();

    // If search box is empty, load all customers
    if (!keyword) {
      loadCustomers();
      return;
    }

    try {
      const response = await searchCustomers(keyword);

      setCustomers(response.data.data);
    } catch (error) {
      console.error(error);

      errorToast("Unable to search customers.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteCustomer(id);

      successToast(response.data.message);

      loadCustomers();
    } catch (error) {
      console.error(error);

      errorToast(error.response?.data?.message || "Unable to delete customer.");
    }
  };

  if (loading) {
    return <h3>Loading Customers...</h3>;
  }

  return (
    // <div className="customer-list-page">
    <div className="customer-page">
      {/* Header */}

      <div className="customer-header">
        <div>
          <h2>Customers</h2>

          <p>Manage customer records and details</p>
        </div>

        <Link to="/customers/add" className="add-btn">
          <FaPlus />
          Add Customer
        </Link>
      </div>

      {/* Search */}

      <div className="search-card">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name, mobile or customer code..."
        />
      </div>

      {/* Table */}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Customer Code</th>

              <th>Name</th>

              <th>Mobile</th>

              <th>City</th>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Customers Found
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.customerId}>
                  <td>{customer.customerCode}</td>

                  <td>{customer.customerName}</td>

                  <td>{customer.mobileNumber}</td>

                  <td>{customer.city}</td>

                  <td>
                    <span
                      className={
                        customer.status ? "status active" : "status inactive"
                      }
                    >
                      {customer.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <Link
                      to={`/customers/${customer.customerId}`}
                      className="view-btn"
                    >
                      <FaEye />
                    </Link>

                    <Link
                      to={`/customers/edit/${customer.customerId}`}
                      className="edit-btn"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(customer.customerId)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
