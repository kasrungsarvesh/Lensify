import { useEffect, useState } from "react";
import { FaExclamationTriangle, FaSpinner, FaBoxOpen } from "react-icons/fa";

import "./dashboard.css";

import api from "../../api/axios";

function LowStockProducts() {
  // ============================================================
  // STATE
  // ============================================================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Low stock threshold
  const LOW_STOCK_LIMIT = 5;

  // ============================================================
  // FETCH PRODUCTS
  // ============================================================

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  const fetchLowStockProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/product");

      console.log("Product API Response:", response.data);

      const productData = response.data?.data || [];

      // ========================================================
      // FILTER LOW STOCK PRODUCTS
      // ========================================================

      const lowStock = productData
        .filter((product) => {
          const stock = Number(
            product.stock ?? product.quantity ?? product.stockQuantity ?? 0,
          );

          return stock <= LOW_STOCK_LIMIT;
        })
        .map((product) => ({
          ...product,
          stock: Number(
            product.stock ?? product.quantity ?? product.stockQuantity ?? 0,
          ),
        }))
        .sort((a, b) => a.stock - b.stock);

      setProducts(lowStock);
    } catch (err) {
      console.error("Low Stock Products Error:", err);

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You are not authorized to view products.");
      } else {
        setError("Unable to load stock information.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="info-card">
        <div className="card-header">
          <h3>
            <FaExclamationTriangle />
            Low Stock Products
          </h3>
        </div>

        <div className="card-body low-stock-loading">
          <FaSpinner className="loading-spinner" />

          <span>Loading stock...</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="info-card">
        <div className="card-header">
          <h3>
            <FaExclamationTriangle />
            Low Stock Products
          </h3>
        </div>

        <div className="card-body">
          <div className="low-stock-error">{error}</div>
        </div>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="info-card">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="card-header">
        <h3>
          <FaExclamationTriangle />
          Low Stock Products
        </h3>

        {products.length > 0 && (
          <span className="low-stock-count">{products.length}</span>
        )}
      </div>

      {/* ========================================================
          BODY
      ======================================================== */}

      <div className="card-body">
        {products.length === 0 ? (
          <div className="no-low-stock">
            <FaBoxOpen />

            <p>All products are sufficiently stocked.</p>
          </div>
        ) : (
          products.map((item) => (
            <div className="list-item" key={item.productId}>
              <div className="product-stock-info">
                <h4>{item.productName || item.name || "Unnamed Product"}</h4>

                {item.categoryName && <small>{item.categoryName}</small>}
              </div>

              <span
                className={`stock-badge ${
                  item.stock <= 2 ? "critical-stock" : "low-stock"
                }`}
              >
                {item.stock} Left
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LowStockProducts;
