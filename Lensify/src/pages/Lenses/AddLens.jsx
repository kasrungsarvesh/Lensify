import { useState } from "react";
import { FaArrowLeft, FaSave, FaGlasses } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./LensForm.css";

function AddLens() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "",
    lensType: "",
    lensMaterial: "",
    power: "",
    price: "",
    stock: "",
    status: true,
  });

  const [loading, setLoading] = useState(false);

  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.brand.trim()) {
      alert("Please enter lens brand.");
      return;
    }

    if (!formData.lensType.trim()) {
      alert("Please enter lens type.");
      return;
    }

    if (!formData.lensMaterial.trim()) {
      alert("Please enter lens material.");
      return;
    }

    if (!formData.power.trim()) {
      alert("Please enter lens power.");
      return;
    }

    if (formData.price === "" || Number(formData.price) < 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (formData.stock === "" || Number(formData.stock) < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/lenses", {
        brand: formData.brand.trim(),
        lensType: formData.lensType.trim(),
        lensMaterial: formData.lensMaterial.trim(),
        power: formData.power.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        status: formData.status,
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to create lens.");
      }

      alert("Lens added successfully.");

      navigate("/lenses");
    } catch (error) {
      console.error("Create Lens Error:", error);

      alert(
        error.response?.data?.message || error.message || "Failed to add lens.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-lens-page">
      {/* Header */}

      <div className="add-lens-header">
        <div>
          <Link to="/lenses" className="back-lens-btn">
            <FaArrowLeft />
            Back to Lenses
          </Link>

          <h1>Add Lens</h1>

          <p>Add a new optical lens to your inventory</p>
        </div>
      </div>

      {/* Form Card */}

      <div className="add-lens-card">
        <div className="add-lens-card-header">
          <div className="add-lens-icon">
            <FaGlasses />
          </div>

          <div>
            <h2>Lens Information</h2>
            <p>Enter the details of the lens</p>
          </div>
        </div>

        <form className="add-lens-form" onSubmit={handleSubmit}>
          {/* Brand */}

          <div className="lens-form-group">
            <label>
              Brand <span>*</span>
            </label>

            <input
              type="text"
              name="brand"
              placeholder="Enter lens brand"
              value={formData.brand}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Lens Type */}

          <div className="lens-form-group">
            <label>
              Lens Type <span>*</span>
            </label>

            <input
              type="text"
              name="lensType"
              placeholder="e.g. Single Vision, Blue Cut"
              value={formData.lensType}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Material */}

          <div className="lens-form-group">
            <label>
              Lens Material <span>*</span>
            </label>

            <input
              type="text"
              name="lensMaterial"
              placeholder="e.g. CR-39, Polycarbonate"
              value={formData.lensMaterial}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Power */}

          <div className="lens-form-group">
            <label>
              Power <span>*</span>
            </label>

            <input
              type="text"
              name="power"
              placeholder="e.g. +1.50 or -2.00"
              value={formData.power}
              onChange={handleChange}
              disabled={loading}
            />

            <small>Enter the lens power as stored in your system.</small>
          </div>

          {/* Price */}

          <div className="lens-form-group">
            <label>
              Price <span>*</span>
            </label>

            <div className="lens-price-input">
              <span>₹</span>

              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          {/* Stock */}

          <div className="lens-form-group">
            <label>
              Stock <span>*</span>
            </label>

            <input
              type="number"
              name="stock"
              min="0"
              step="1"
              placeholder="Enter stock quantity"
              value={formData.stock}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Status */}

          <div className="lens-form-group">
            <label>Status</label>

            <label className="lens-status-toggle">
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                disabled={loading}
              />

              <span className="toggle-slider"></span>

              <span>{formData.status ? "Active" : "Inactive"}</span>
            </label>
          </div>

          {/* Buttons */}

          <div className="add-lens-actions">
            <Link to="/lenses" className="cancel-lens-btn">
              Cancel
            </Link>

            <button type="submit" className="save-lens-btn" disabled={loading}>
              <FaSave />

              {loading ? "Saving..." : "Add Lens"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLens;
