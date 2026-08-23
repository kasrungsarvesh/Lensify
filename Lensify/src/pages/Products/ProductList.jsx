import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/product");

      console.log("Product Response:", response.data);

      setProducts(response.data?.data || []);
    } catch (error) {
      console.error("Fetch products error:", error);

      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await api.delete(`/product/${id}`);

      console.log("Delete Product Response:", response.data);

      alert("Product deleted successfully.");

      fetchProducts();
    } catch (error) {
      console.error("Delete product error:", error);

      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to delete product.");
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredProducts = products.filter((product) => {
    const keyword = searchKeyword.toLowerCase();

    return (
      product.productName?.toLowerCase().includes(keyword) ||
      product.brand?.toLowerCase().includes(keyword) ||
      product.categoryName?.toLowerCase().includes(keyword)
    );
  });

  // =========================
  // STOCK COUNTS
  // =========================

  const totalProducts = products.length;

  const lowStockProducts = products.filter(
    (product) =>
      Number(product.stockQuantity) > 0 && Number(product.stockQuantity) <= 5,
  ).length;

  const outOfStockProducts = products.filter(
    (product) => Number(product.stockQuantity) === 0,
  ).length;

  return (
    <div className="product-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="product-header">
        <div>
          <h2>Products</h2>

          <p>Manage frames, lenses and accessories</p>
        </div>

        <Link to="/products/add" className="add-product-btn">
          <FaPlus />
          Add Product
        </Link>
      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="product-stats">
        {/* TOTAL */}

        <div className="stat-card">
          <FaBoxOpen />

          <div>
            <h3>{totalProducts}</h3>

            <p>Total Products</p>
          </div>
        </div>

        {/* LOW STOCK */}

        <div className="stat-card">
          <FaBoxOpen />

          <div>
            <h3>{lowStockProducts}</h3>

            <p>Low Stock</p>
          </div>
        </div>

        {/* OUT OF STOCK */}

        <div className="stat-card">
          <FaBoxOpen />

          <div>
            <h3>{outOfStockProducts}</h3>

            <p>Out Of Stock</p>
          </div>
        </div>
      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-card">
        <input
          type="text"
          placeholder="Search product..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {/* =========================
          TABLE
      ========================= */}

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
            {loading ? (
              <tr>
                <td colSpan="8">Loading products...</td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const stock = Number(product.stockQuantity) || 0;

                let stockClass = "in-stock";
                let stockText = "In Stock";

                if (stock === 0) {
                  stockClass = "out-stock";
                  stockText = "Out Of Stock";
                } else if (stock <= 5) {
                  stockClass = "low-stock";
                  stockText = "Low Stock";
                }

                return (
                  <tr key={product.productId}>
                    {/* ID */}

                    <td>{product.productId}</td>

                    {/* PRODUCT */}

                    <td>{product.productName}</td>

                    {/* CATEGORY */}

                    <td>{product.categoryName || "-"}</td>

                    {/* BRAND */}

                    <td>{product.brand || "-"}</td>

                    {/* SELLING PRICE */}

                    <td>₹{product.sellingPrice}</td>

                    {/* STOCK */}

                    <td>{stock}</td>

                    {/* STATUS */}

                    <td>
                      <span className={`status ${stockClass}`}>
                        {stockText}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="action-buttons">
                      <Link
                        to={`/products/edit/${product.productId}`}
                        className="edit-btn"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(product.productId)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
