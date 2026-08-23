import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave, FaEdit } from "react-icons/fa";
import api from "../../api/axios";
import "./AddProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    productName: "",
    categoryId: "",
    brand: "",
    modelNumber: "",
    barcode: "",

    purchasePrice: "",
    sellingPrice: "",

    stockQuantity: "",
    color: "",
    size: "",

    status: "Active",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // FETCH PRODUCT
  // =========================

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/product/${id}`);

      console.log("Product Response:", response.data);

      const data = response.data?.data;

      setProduct({
        productName: data?.productName || "",
        categoryId: data?.category?.categoryId || "",
        brand: data?.brand || "",
        modelNumber: data?.modelNumber || "",
        barcode: data?.barcode || "",

        purchasePrice:
          data?.purchasePrice !== null && data?.purchasePrice !== undefined
            ? data.purchasePrice
            : "",

        sellingPrice:
          data?.sellingPrice !== null && data?.sellingPrice !== undefined
            ? data.sellingPrice
            : "",

        stockQuantity:
          data?.stockQuantity !== null && data?.stockQuantity !== undefined
            ? data.stockQuantity
            : "",

        color: data?.color || "",
        size: data?.size || "",

        status: data?.status || "Active",
        description: data?.description || "",
      });
    } catch (error) {
      console.error("Fetch product error:", error);
      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to fetch product.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH CATEGORIES
  // =========================

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category");

      console.log("Category Response:", response.data);

      setCategories(response.data?.data || []);
    } catch (error) {
      console.error("Fetch categories error:", error);
      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to fetch categories.");
    }
  };

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove error while user corrects the field
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

    // Product Name
    const productName = product.productName.trim();

    if (!productName) {
      newErrors.productName = "Product name is required.";
    } else if (productName.length < 2) {
      newErrors.productName =
        "Product name must contain at least 2 characters.";
    } else if (productName.length > 100) {
      newErrors.productName = "Product name cannot exceed 100 characters.";
    }

    // Category
    if (!product.categoryId) {
      newErrors.categoryId = "Please select a category.";
    }

    // Brand
    const brand = product.brand.trim();

    if (!brand) {
      newErrors.brand = "Brand is required.";
    } else if (!/^[a-zA-Z0-9\s&.-]+$/.test(brand)) {
      newErrors.brand =
        "Brand can contain letters, numbers, spaces, &, . and - only.";
    } else if (brand.length > 50) {
      newErrors.brand = "Brand cannot exceed 50 characters.";
    }

    // Model Number
    const modelNumber = product.modelNumber.trim();

    if (!modelNumber) {
      newErrors.modelNumber = "Model number is required.";
    } else if (modelNumber.length > 50) {
      newErrors.modelNumber = "Model number cannot exceed 50 characters.";
    }

    // Barcode
    const barcode = product.barcode.trim();

    if (!barcode) {
      newErrors.barcode = "Barcode is required.";
    } else if (!/^[a-zA-Z0-9-]+$/.test(barcode)) {
      newErrors.barcode =
        "Barcode can contain letters, numbers and hyphen only.";
    } else if (barcode.length < 6 || barcode.length > 20) {
      newErrors.barcode = "Barcode must contain 6 to 20 characters.";
    }

    // Purchase Price
    if (product.purchasePrice === "") {
      newErrors.purchasePrice = "Purchase price is required.";
    } else if (Number(product.purchasePrice) < 0) {
      newErrors.purchasePrice = "Purchase price cannot be negative.";
    }

    // Selling Price
    if (product.sellingPrice === "") {
      newErrors.sellingPrice = "Selling price is required.";
    } else if (Number(product.sellingPrice) < 0) {
      newErrors.sellingPrice = "Selling price cannot be negative.";
    } else if (
      product.purchasePrice !== "" &&
      Number(product.sellingPrice) < Number(product.purchasePrice)
    ) {
      newErrors.sellingPrice =
        "Selling price cannot be less than purchase price.";
    }

    // Stock Quantity
    if (product.stockQuantity === "") {
      newErrors.stockQuantity = "Stock quantity is required.";
    } else if (!Number.isInteger(Number(product.stockQuantity))) {
      newErrors.stockQuantity = "Stock quantity must be a whole number.";
    } else if (Number(product.stockQuantity) < 0) {
      newErrors.stockQuantity = "Stock quantity cannot be negative.";
    }

    // Color
    const color = product.color.trim();

    if (color && !/^[a-zA-Z\s-]+$/.test(color)) {
      newErrors.color = "Color can contain letters, spaces and hyphen only.";
    }

    // Size
    const size = product.size.trim();

    if (size && size.length > 30) {
      newErrors.size = "Size cannot exceed 30 characters.";
    }

    // Description
    if (product.description.length > 500) {
      newErrors.description = "Description cannot exceed 500 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // UPDATE PRODUCT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stop API request if validation fails
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const requestData = {
        productName: product.productName.trim(),

        categoryId: Number(product.categoryId),

        brand: product.brand.trim(),
        modelNumber: product.modelNumber.trim(),
        barcode: product.barcode.trim(),

        purchasePrice:
          product.purchasePrice === "" ? null : Number(product.purchasePrice),

        sellingPrice:
          product.sellingPrice === "" ? null : Number(product.sellingPrice),

        stockQuantity:
          product.stockQuantity === "" ? null : Number(product.stockQuantity),

        color: product.color.trim(),
        size: product.size.trim(),

        status: product.status,

        description: product.description.trim(),
      };

      console.log("Update Product Request:", requestData);

      const response = await api.put(`/product/${id}`, requestData);

      console.log("Update Product Response:", response.data);

      alert(response.data?.message || "Product updated successfully.");

      navigate("/products");
    } catch (error) {
      console.error("Update product error:", error);

      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to update product.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="add-product-page">
        <div className="page-header">
          <div>
            <h2>Edit Product</h2>
            <p>Loading product...</p>
          </div>

          <div className="header-icon">
            <FaEdit />
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // JSX
  // =========================

  return (
    <div className="add-product-page">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h2>Edit Product</h2>
          <p>Product ID : {id}</p>
        </div>

        <div className="header-icon">
          <FaEdit />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* =========================
            PRODUCT INFORMATION
        ========================= */}

        <div className="product-card">
          <h3>Product Information</h3>

          <div className="grid-3">
            {/* PRODUCT NAME */}

            <div>
              <label>Product Name</label>

              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                maxLength="100"
              />

              {errors.productName && (
                <small className="error-message">{errors.productName}</small>
              )}
            </div>

            {/* CATEGORY */}

            <div>
              <label>Category</label>

              <select
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>

              {errors.categoryId && (
                <small className="error-message">{errors.categoryId}</small>
              )}
            </div>

            {/* BRAND */}

            <div>
              <label>Brand</label>

              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                placeholder="Enter brand"
                maxLength="50"
              />

              {errors.brand && (
                <small className="error-message">{errors.brand}</small>
              )}
            </div>

            {/* MODEL NUMBER */}

            <div>
              <label>Model Number</label>

              <input
                type="text"
                name="modelNumber"
                value={product.modelNumber}
                onChange={handleChange}
                placeholder="Enter model number"
                maxLength="50"
              />

              {errors.modelNumber && (
                <small className="error-message">{errors.modelNumber}</small>
              )}
            </div>

            {/* BARCODE */}

            <div>
              <label>Barcode</label>

              <input
                type="text"
                name="barcode"
                value={product.barcode}
                onChange={handleChange}
                placeholder="Enter barcode"
                maxLength="20"
              />

              {errors.barcode && (
                <small className="error-message">{errors.barcode}</small>
              )}
            </div>
          </div>
        </div>

        {/* =========================
            PRICING
        ========================= */}

        <div className="product-card">
          <h3>Pricing Information</h3>

          <div className="grid-3">
            {/* PURCHASE PRICE */}

            <div>
              <label>Purchase Price</label>

              <input
                type="number"
                name="purchasePrice"
                value={product.purchasePrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />

              {errors.purchasePrice && (
                <small className="error-message">{errors.purchasePrice}</small>
              )}
            </div>

            {/* SELLING PRICE */}

            <div>
              <label>Selling Price</label>

              <input
                type="number"
                name="sellingPrice"
                value={product.sellingPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />

              {errors.sellingPrice && (
                <small className="error-message">{errors.sellingPrice}</small>
              )}
            </div>
          </div>
        </div>

        {/* =========================
            INVENTORY
        ========================= */}

        <div className="product-card">
          <h3>Inventory Information</h3>

          <div className="grid-3">
            {/* STOCK */}

            <div>
              <label>Stock Quantity</label>

              <input
                type="number"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
                min="0"
                step="1"
                placeholder="0"
              />

              {errors.stockQuantity && (
                <small className="error-message">{errors.stockQuantity}</small>
              )}
            </div>

            {/* COLOR */}

            <div>
              <label>Color</label>

              <input
                type="text"
                name="color"
                value={product.color}
                onChange={handleChange}
                placeholder="Enter color"
              />

              {errors.color && (
                <small className="error-message">{errors.color}</small>
              )}
            </div>

            {/* SIZE */}

            <div>
              <label>Size</label>

              <input
                type="text"
                name="size"
                value={product.size}
                onChange={handleChange}
                placeholder="Enter size"
                maxLength="30"
              />

              {errors.size && (
                <small className="error-message">{errors.size}</small>
              )}
            </div>

            {/* STATUS */}

            <div>
              <label>Status</label>

              <select
                name="status"
                value={product.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* =========================
            DESCRIPTION
        ========================= */}

        <div className="product-card">
          <h3>Description</h3>

          <textarea
            rows="5"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
            maxLength="500"
          />

          {errors.description && (
            <small className="error-message">{errors.description}</small>
          )}

          <small>{product.description.length}/500</small>
        </div>

        {/* =========================
            UPDATE BUTTON
        ========================= */}

        <button type="submit" className="save-btn" disabled={saving}>
          <FaSave />

          {saving ? "Updating Product..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
