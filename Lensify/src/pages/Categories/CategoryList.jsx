import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTags } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "./CategoryList.css";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH CATEGORIES
  // =========================

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await api.get("/category");

      console.log("Category Response:", response.data);

      setCategories(response.data?.data || []);
    } catch (error) {
      console.error("Fetch categories error:", error);

      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD ON PAGE OPEN
  // =========================

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================
  // DELETE CATEGORY
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await api.delete(`/category/${id}`);

      console.log("Delete Response:", response.data);

      alert("Category deleted successfully.");

      fetchCategories();
    } catch (error) {
      console.error("Delete category error:", error);

      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to delete category.");
    }
  };

  // =========================
  // SEARCH
  // =========================

  const filteredCategories = categories.filter((category) =>
    category.categoryName?.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div className="category-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="category-header">
        <div>
          <h2>Categories</h2>

          <p>Manage product categories</p>
        </div>

        <Link to="/categories/add" className="add-category-btn">
          <FaPlus />
          Add Category
        </Link>
      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="category-stats">
        <div className="stat-card">
          <FaTags />

          <div>
            <h3>{categories.length}</h3>

            <p>Total Categories</p>
          </div>
        </div>
      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-card">
        <input
          type="text"
          placeholder="Search category..."
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
              <th>Category Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading categories...</td>
              </tr>
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.categoryId}>
                  <td>{category.categoryId}</td>

                  <td>{category.categoryName}</td>

                  <td>{category.description || "-"}</td>

                  <td>{category.status}</td>

                  <td className="action-buttons">
                    <Link
                      to={`/categories/edit/${category.categoryId}`}
                      className="edit-btn"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(category.categoryId)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryList;
