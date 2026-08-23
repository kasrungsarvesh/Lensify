import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSave, FaEdit } from "react-icons/fa";
import api from "../../api/axios";
import "./AddCategory.css";

function EditCategory() {
  const { id } = useParams();

  const [category, setCategory] = useState({
    categoryName: "",
    description: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // FETCH CATEGORY
  // =========================

  const fetchCategory = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/category/${id}`);

      console.log("Category Response:", response.data);

      const categoryData = response.data?.data;

      if (categoryData) {
        setCategory({
          categoryName: categoryData.categoryName || "",
          description: categoryData.description || "",
          status: categoryData.status || "Active",
        });
      }
    } catch (error) {
      console.error("Fetch category error:", error);

      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to fetch category.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD CATEGORY
  // =========================

  useEffect(() => {
    fetchCategory();
  }, [id]);

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // UPDATE CATEGORY
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.categoryName.trim()) {
      alert("Please enter category name.");
      return;
    }

    try {
      setSaving(true);

      console.log("Update Category Request:", category);

      const response = await api.put(`/category/${id}`, category);

      console.log("Update Category Response:", response.data);

      alert("Category updated successfully.");
    } catch (error) {
      console.error("Update category error:", error);

      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to update category.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-category-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="page-header">
        <div>
          <h2>Edit Category</h2>

          <p>Category ID : {id}</p>
        </div>

        <div className="header-icon">
          <FaEdit />
        </div>
      </div>

      {loading ? (
        <div className="category-card">
          <p>Loading category...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* =========================
              CATEGORY INFORMATION
          ========================= */}

          <div className="category-card">
            <h3>Category Information</h3>

            {/* CATEGORY NAME */}

            <div className="form-group">
              <label>
                Category Name <span>*</span>
              </label>

              <input
                type="text"
                name="categoryName"
                value={category.categoryName}
                onChange={handleChange}
              />
            </div>

            {/* DESCRIPTION */}

            <div className="form-group">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                value={category.description}
                onChange={handleChange}
              />
            </div>

            {/* STATUS */}

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={category.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* =========================
              UPDATE BUTTON
          ========================= */}

          <button type="submit" className="save-btn" disabled={saving}>
            <FaSave />

            {saving ? "Updating Category..." : "Update Category"}
          </button>
        </form>
      )}
    </div>
  );
}

export default EditCategory;
