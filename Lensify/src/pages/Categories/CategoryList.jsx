import { FaPlus, FaEdit, FaTrash, FaTags } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./CategoryList.css";

function CategoryList() {
  return (
    <div className="category-page">

      {/* Header */}

      <div className="category-header">

        <div>
          <h2>Categories</h2>
          <p>Manage product categories</p>
        </div>

        <Link
          to="/categories/add"
          className="add-category-btn"
        >
          <FaPlus />
          Add Category
        </Link>

      </div>

      {/* Stats */}

      <div className="category-stats">

        <div className="stat-card">

          <FaTags />

          <div>
            <h3>8</h3>
            <p>Total Categories</p>
          </div>

        </div>

      </div>

      {/* Search */}

      <div className="search-card">

        <input
          type="text"
          placeholder="Search category..."
        />

      </div>

      {/* Table */}

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Products</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            <tr>

              <td>1</td>

              <td>Frames</td>

              <td>
                Spectacle Frames
              </td>

              <td>25</td>

              <td className="action-buttons">

                <Link
                  to="/categories/edit/1"
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

                <button className="delete-btn">
                  <FaTrash />
                </button>

              </td>

            </tr>

            <tr>

              <td>2</td>

              <td>Lenses</td>

              <td>
                Optical Lenses
              </td>

              <td>40</td>

              <td className="action-buttons">

                <Link
                  to="/categories/edit/2"
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

                <button className="delete-btn">
                  <FaTrash />
                </button>

              </td>

            </tr>

            <tr>

              <td>3</td>

              <td>Accessories</td>

              <td>
                Cleaning Kits & Cases
              </td>

              <td>15</td>

              <td className="action-buttons">

                <Link
                  to="/categories/edit/3"
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

                <button className="delete-btn">
                  <FaTrash />
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CategoryList;