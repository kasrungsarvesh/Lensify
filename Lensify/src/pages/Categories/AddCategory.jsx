import { useState } from "react";
import { FaSave, FaTags } from "react-icons/fa";
import "./AddCategory.css";

function AddCategory() {
  const [category, setCategory] = useState({
    categoryName: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(category);

    alert("Category Added Successfully");
  };

  return (
    <div className="add-category-page">

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

        <div className="category-card">

          <h3>Category Information</h3>

          <div className="form-group">

            <label>Category Name</label>

            <input
              type="text"
              name="categoryName"
              placeholder="Enter category name"
              value={category.categoryName}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              placeholder="Enter category description"
              value={category.description}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Status</label>

            <select
              name="status"
              value={category.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

          </div>

        </div>

        <button
          type="submit"
          className="save-btn"
        >
          <FaSave />
          Save Category
        </button>

      </form>

    </div>
  );
}

export default AddCategory;