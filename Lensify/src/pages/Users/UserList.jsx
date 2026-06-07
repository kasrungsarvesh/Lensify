import {
  FaUserPlus,
  FaEdit,
  FaUserShield
} from "react-icons/fa";

import { Link } from "react-router-dom";
import "./UserList.css";

function UserList() {
  return (
    <div className="user-page">

      {/* Header */}

      <div className="user-header">

        <div>
          <h2>User Management</h2>
          <p>
            Manage system users and roles
          </p>
        </div>

        <Link
          to="/register"
          className="add-user-btn"
        >
          <FaUserPlus />
          Add User
        </Link>

      </div>

      {/* Stats */}

      <div className="user-stats">

        <div className="stat-card">

          <FaUserShield />

          <div>
            <h3>8</h3>
            <p>Total Users</p>
          </div>

        </div>

        <div className="stat-card">

          <FaUserShield />

          <div>
            <h3>6</h3>
            <p>Active Users</p>
          </div>

        </div>

        <div className="stat-card">

          <FaUserShield />

          <div>
            <h3>2</h3>
            <p>Inactive Users</p>
          </div>

        </div>

      </div>

      {/* Search */}

      <div className="search-card">

        <input
          type="text"
          placeholder="Search user..."
        />

      </div>

      {/* Table */}

      <div className="table-card">

        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>1</td>

              <td>Admin User</td>

              <td>
                admin@lensify.com
              </td>

              <td>
                9876543210
              </td>

              <td>
                <span className="role owner">
                  Owner
                </span>
              </td>

              <td>
                <span className="status active">
                  Active
                </span>
              </td>

              <td className="action-buttons">

                <Link
                  to="/users/edit/1"
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

              </td>

            </tr>

            <tr>

              <td>2</td>

              <td>Priya Patel</td>

              <td>
                priya@lensify.com
              </td>

              <td>
                9988776655
              </td>

              <td>
                <span className="role receptionist">
                  Receptionist
                </span>
              </td>

              <td>
                <span className="status active">
                  Active
                </span>
              </td>

              <td className="action-buttons">

                <Link
                  to="/users/edit/2"
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

              </td>

            </tr>

            <tr>

              <td>3</td>

              <td>Dr Shah</td>

              <td>
                doctor@lensify.com
              </td>

              <td>
                9999999999
              </td>

              <td>
                <span className="role doctor">
                  Optometrist
                </span>
              </td>

              <td>
                <span className="status inactive">
                  Inactive
                </span>
              </td>

              <td className="action-buttons">

                <Link
                  to="/users/edit/3"
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default UserList;