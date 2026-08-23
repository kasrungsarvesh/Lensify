import { useState } from "react";
import { FaSave, FaTags } from "react-icons/fa";
import api from "../../api/axios";
import "./AddCategory.css";

function AddCategory() {
  const [category, setCategory] = useState({
    categoryName: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategory((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove error when user starts correcting the field
    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {
    const newErrors = {};

    const categoryName = category.categoryName.trim();
    const description = category.description.trim();

    // Category Name
    if (!categoryName) {
      newErrors.categoryName = "Category name is required.";
    } else if (categoryName.length < 2) {
      newErrors.categoryName =
        "Category name must contain at least 2 characters.";
    } else if (categoryName.length > 50) {
      newErrors.categoryName = "Category name cannot exceed 50 characters.";
    } else if (!/^[A-Za-z0-9][A-Za-z0-9 &()/-]*$/.test(categoryName)) {
      newErrors.categoryName =
        "Category name can contain letters, numbers, spaces, &, (, ), / and - only.";
    }

    // Description
    if (description.length > 250) {
      newErrors.description = "Description cannot exceed 250 characters.";
    }

    // Status
    if (!["Active", "Inactive"].includes(category.status)) {
      newErrors.status = "Please select a valid status.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // SUBMIT CATEGORY
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const requestData = {
        categoryName: category.categoryName.trim(),
        description: category.description.trim(),
        status: category.status,
      };

      console.log("Category Request:", requestData);

      const response = await api.post("/category", requestData);

      console.log("Category Response:", response.data);

      alert("Category added successfully.");

      // Reset form
      setCategory({
        categoryName: "",
        description: "",
        status: "Active",
      });

      setErrors({});
    } catch (error) {
      console.error("Save category error:", error);

      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-category-page">
      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header">
        <div>
          <h2>Add Category</h2>

          <p>Create a new product category</p>
        </div>

        <div className="header-icon">
          <FaTags />
        </div>
      </div>

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
              placeholder="Enter category name"
              value={category.categoryName}
              onChange={handleChange}
              maxLength={50}
            />

            {errors.categoryName && (
              <small className="validation-error">{errors.categoryName}</small>
            )}
          </div>

          {/* DESCRIPTION */}

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              placeholder="Enter category description"
              value={category.description}
              onChange={handleChange}
              maxLength={250}
            />

            <div className="field-info">{category.description.length}/250</div>

            {errors.description && (
              <small className="validation-error">{errors.description}</small>
            )}
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

            {errors.status && (
              <small className="validation-error">{errors.status}</small>
            )}
          </div>
        </div>

        {/* =========================
            SAVE BUTTON
        ========================= */}

        <button type="submit" className="save-btn" disabled={saving}>
          <FaSave />

          {saving ? "Saving Category..." : "Save Category"}
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
