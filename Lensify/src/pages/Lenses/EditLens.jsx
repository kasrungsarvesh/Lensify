import { useEffect, useState } from "react";
import { FaArrowLeft, FaSave, FaGlasses } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import "./LensForm.css";

function EditLens() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================================================
  // FETCH LENS
  // =========================================================

  const fetchLens = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/lenses/${id}`);

      const lens = response.data?.data;

      if (!lens) {
        throw new Error("Lens not found.");
      }

      setFormData({
        brand: lens.brand || "",
        lensType: lens.lensType || "",
        lensMaterial: lens.lensMaterial || "",
        power:
          lens.power !== null && lens.power !== undefined
            ? String(lens.power)
            : "",
        price:
          lens.price !== null && lens.price !== undefined
            ? String(lens.price)
            : "",
        stock:
          lens.stock !== null && lens.stock !== undefined
            ? String(lens.stock)
            : "",
        status:
          lens.status !== null && lens.status !== undefined
            ? Boolean(lens.status)
            : true,
      });
    } catch (error) {
      console.error("Error fetching lens:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to load lens.",
      );

      navigate("/lenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLens();
  }, [id]);

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
  // UPDATE LENS
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
      alert("Please enter a valid stock.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.put(`/lenses/${id}`, {
        brand: formData.brand.trim(),
        lensType: formData.lensType.trim(),
        lensMaterial: formData.lensMaterial.trim(),
        power: formData.power.trim(),
        price: Number(formData.price),
        stock: Number(formData.stock),
        status: formData.status,
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to update lens.");
      }

      alert("Lens updated successfully.");

      navigate("/lenses");
    } catch (error) {
      console.error("Update Lens Error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to update lens.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="edit-lens-page">
        <div className="edit-lens-loading">Loading lens...</div>
      </div>
    );
  }

  return (
    <div className="edit-lens-page">
      {/* Header */}

      <div className="edit-lens-header">
        <div>
          <Link to="/lenses" className="back-lens-btn">
            <FaArrowLeft />
            Back to Lenses
          </Link>

          <h1>Edit Lens</h1>

          <p>Update lens information and inventory</p>
        </div>
      </div>

      {/* Form Card */}

      <div className="edit-lens-card">
        <div className="edit-lens-card-header">
          <div className="edit-lens-icon">
            <FaGlasses />
          </div>

          <div>
            <h2>Lens Information</h2>

            <p>Lens ID: {id}</p>
          </div>
        </div>

        <form className="edit-lens-form" onSubmit={handleSubmit}>
          {/* Brand */}

          <div className="lens-form-group">
            <label>
              Brand <span>*</span>
            </label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          {/* Type */}

          <div className="lens-form-group">
            <label>
              Lens Type <span>*</span>
            </label>

            <input
              type="text"
              name="lensType"
              value={formData.lensType}
              onChange={handleChange}
              disabled={saving}
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
              value={formData.lensMaterial}
              onChange={handleChange}
              disabled={saving}
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
              value={formData.power}
              onChange={handleChange}
              disabled={saving}
            />
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
                value={formData.price}
                onChange={handleChange}
                disabled={saving}
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
              value={formData.stock}
              onChange={handleChange}
              disabled={saving}
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
                disabled={saving}
              />

              <span className="toggle-slider"></span>

              <span>{formData.status ? "Active" : "Inactive"}</span>
            </label>
          </div>

          {/* Actions */}

          <div className="edit-lens-actions">
            <Link to="/lenses" className="cancel-lens-btn">
              Cancel
            </Link>

            <button type="submit" className="save-lens-btn" disabled={saving}>
              <FaSave />

              {saving ? "Updating..." : "Update Lens"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditLens;
