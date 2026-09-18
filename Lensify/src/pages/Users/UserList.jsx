import { useEffect, useState } from "react";
import { FaUserPlus, FaEdit, FaUserShield, FaSearch } from "react-icons/fa";

import { Link } from "react-router-dom";
import api from "../../api/axios";

import "./UserList.css";

function UserList() {
  // =========================
  // STATE
  // =========================

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH USERS
  // =========================

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/users");

      console.log("Users API response:", response.data);

      const userData = response.data?.data || [];

      setUsers(Array.isArray(userData) ? userData : []);
    } catch (error) {
      console.error("Error fetching users:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load users. Please try again.",
      );

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return true;
    }

    return (
      user.fullName?.toLowerCase().includes(search) ||
      user.username?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.phoneNumber?.toLowerCase().includes(search) ||
      user.roleName?.toLowerCase().includes(search)
    );
  });

  // =========================
  // STATS
  // =========================

  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.status === true).length;

  const inactiveUsers = users.filter((user) => user.status === false).length;

  // =========================
  // ROLE DISPLAY
  // =========================

  const formatRole = (role) => {
    if (!role) {
      return "User";
    }

    return role
      .replace("ROLE_", "")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // =========================
  // ROLE CSS CLASS
  // =========================

  const getRoleClass = (role) => {
    if (!role) {
      return "user";
    }

    return role.replace("ROLE_", "").toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="user-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="user-header">
        <div>
          <h2>User Management</h2>

          <p>Manage system users and roles</p>
        </div>

        <Link to="/register" className="add-user-btn">
          <FaUserPlus />
          Add User
        </Link>
      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="user-stats">
        {/* TOTAL */}

        <div className="stat-card">
          <FaUserShield />

          <div>
            <h3>{totalUsers}</h3>

            <p>Total Users</p>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="stat-card">
          <FaUserShield />

          <div>
            <h3>{activeUsers}</h3>

            <p>Active Users</p>
          </div>
        </div>

        {/* INACTIVE */}

        <div className="stat-card">
          <FaUserShield />

          <div>
            <h3>{inactiveUsers}</h3>

            <p>Inactive Users</p>
          </div>
        </div>
      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-card">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by name, username, email, mobile or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && <div className="user-error">{error}</div>}

      {/* =========================
          TABLE
      ========================= */}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* LOADING */}

            {loading && (
              <tr>
                <td colSpan="8" className="table-message">
                  Loading users...
                </td>
              </tr>
            )}

            {/* NO USERS */}

            {!loading && filteredUsers.length === 0 && (
              <tr>
                <td colSpan="8" className="table-message">
                  {searchTerm
                    ? "No users found matching your search."
                    : "No users found."}
                </td>
              </tr>
            )}

            {/* USERS */}

            {!loading &&
              filteredUsers.map((user) => (
                <tr key={user.userId}>
                  {/* ID */}

                  <td>{user.userId}</td>

                  {/* NAME */}

                  <td>
                    <strong>{user.fullName || "-"}</strong>
                  </td>

                  {/* USERNAME */}

                  <td>@{user.username || "-"}</td>

                  {/* EMAIL */}

                  <td>{user.email || "-"}</td>

                  {/* MOBILE */}

                  <td>{user.phoneNumber || "-"}</td>

                  {/* ROLE */}

                  <td>
                    <span className={`role ${getRoleClass(user.roleName)}`}>
                      {formatRole(user.roleName)}
                    </span>
                  </td>

                  {/* STATUS */}

                  <td>
                    {user.status ? (
                      <span className="status active">Active</span>
                    ) : (
                      <span className="status inactive">Inactive</span>
                    )}
                  </td>

                  {/* ACTIONS */}

                  <td className="action-buttons">
                    <Link
                      to={`/users/edit/${user.userId}`}
                      className="edit-btn"
                      title="Edit User"
                    >
                      <FaEdit />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* =========================
          RESULT COUNT
      ========================= */}

      {!loading && users.length > 0 && (
        <div className="user-result-count">
          Showing <strong>{filteredUsers.length}</strong> of{" "}
          <strong>{users.length}</strong> users
        </div>
      )}
    </div>
  );
}

export default UserList;
