import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaSave, FaEdit } from "react-icons/fa";
import "./AddCategory.css";

function EditCategory() {
  const { id } = useParams();

  const [category, setCategory] = useState({
    categoryName: "Frames",
    description: "Spectacle Frames and Sunglasses",
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

    alert("Category Updated Successfully");
  };

  return (
    <div className="add-category-page">

      <div className="page-header">

        <div>
          <h2>Edit Category</h2>
          <p>Category ID : {id}</p>
        </div>

        <div className="header-icon">
          <FaEdit />
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
              value={category.categoryName}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Description</label>

            <textarea
              rows="5"
              name="description"
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
          Update Category
        </button>

      </form>

    </div>
  );
}

export default EditCategory;