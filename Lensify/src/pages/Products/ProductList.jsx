import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBoxOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ProductList.css";

function ProductList() {
  return (
    <div className="product-page">

      {/* Header */}

      <div className="product-header">

        <div>
          <h2>Products</h2>
          <p>
            Manage frames, lenses and accessories
          </p>
        </div>

        <Link
          to="/products/add"
          className="add-product-btn"
        >
          <FaPlus />
          Add Product
        </Link>

      </div>

      {/* Stats */}

      <div className="product-stats">

        <div className="stat-card">
          <FaBoxOpen />

          <div>
            <h3>120</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <FaBoxOpen />

          <div>
            <h3>15</h3>
            <p>Low Stock</p>
          </div>
        </div>

        <div className="stat-card">
          <FaBoxOpen />

          <div>
            <h3>8</h3>
            <p>Out Of Stock</p>
          </div>
        </div>

      </div>

      {/* Search */}

      <div className="search-card">

        <input
          type="text"
          placeholder="Search product..."
        />

      </div>

      {/* Table */}

      <div className="table-card">

        <table>

          <thead>

            <tr>

              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Selling Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>1</td>

              <td>RayBan RB3025</td>

              <td>Frames</td>

              <td>RayBan</td>

              <td>₹2,500</td>

              <td>25</td>

              <td>
                <span className="status in-stock">
                  In Stock
                </span>
              </td>

              <td className="action-buttons">

                <Link
                  to="/products/edit/1"
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

              <td>Crizal Blue Lens</td>

              <td>Lenses</td>

              <td>Essilor</td>

              <td>₹1,800</td>

              <td>5</td>

              <td>
                <span className="status low-stock">
                  Low Stock
                </span>
              </td>

              <td className="action-buttons">

                <Link
                  to="/products/edit/2"
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

              <td>Cleaning Kit</td>

              <td>Accessories</td>

              <td>Generic</td>

              <td>₹150</td>

              <td>0</td>

              <td>
                <span className="status out-stock">
                  Out Of Stock
                </span>
              </td>

              <td className="action-buttons">

                <Link
                  to="/products/edit/3"
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

export default ProductList;