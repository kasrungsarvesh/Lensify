import { useEffect, useState } from "react";
import { FaSave, FaBoxOpen } from "react-icons/fa";
import api from "../../api/axios";
import "./AddProduct.css";

function AddProduct() {
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

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({});

  // =========================
  // FETCH CATEGORIES
  // =========================

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);

      const response = await api.get("/category");

      console.log("Category Response:", response.data);

      setCategories(response.data?.data || []);
    } catch (error) {
      console.error("Fetch categories error:", error);
      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to fetch categories.");
    } finally {
      setLoadingCategories(false);
    }
  };

  // =========================
  // LOAD CATEGORIES
  // =========================

  useEffect(() => {
    fetchCategories();
  }, []);

  // =========================
  // VALIDATE FIELD
  // =========================

  const validateField = (name, value, currentProduct = product) => {
    let error = "";

    // =========================
    // PRODUCT NAME
    // =========================

    if (name === "productName") {
      const productName = value.trim();

      if (!productName) {
        error = "Product name is required.";
      } else if (productName.length < 2) {
        error = "Product name must be at least 2 characters.";
      } else if (productName.length > 100) {
        error = "Product name cannot exceed 100 characters.";
      }
    }

    // =========================
    // CATEGORY
    // =========================

    if (name === "categoryId") {
      if (!value) {
        error = "Please select a category.";
      }
    }

    // =========================
    // BRAND
    // =========================

    if (name === "brand") {
      const brand = value.trim();

      if (brand && !/^[a-zA-Z0-9\s.-]+$/.test(brand)) {
        error = "Brand contains invalid characters.";
      } else if (brand.length > 50) {
        error = "Brand cannot exceed 50 characters.";
      }
    }

    // =========================
    // MODEL NUMBER
    // =========================

    if (name === "modelNumber") {
      const modelNumber = value.trim();

      if (modelNumber.length > 50) {
        error = "Model number cannot exceed 50 characters.";
      }
    }

    // =========================
    // BARCODE
    // =========================

    if (name === "barcode") {
      const barcode = value.trim();

      if (!barcode) {
        error = "Barcode is required.";
      } else if (!/^[a-zA-Z0-9-]+$/.test(barcode)) {
        error = "Barcode can contain letters, numbers and hyphen only.";
      } else if (barcode.length < 6) {
        error = "Barcode must contain at least 6 characters.";
      } else if (barcode.length > 20) {
        error = "Barcode cannot exceed 20 characters.";
      }
    }

    // =========================
    // PURCHASE PRICE
    // =========================

    if (name === "purchasePrice") {
      if (value === "") {
        error = "Purchase price is required.";
      } else if (Number(value) < 0) {
        error = "Purchase price cannot be negative.";
      }
    }

    // =========================
    // SELLING PRICE
    // =========================

    if (name === "sellingPrice") {
      if (value === "") {
        error = "Selling price is required.";
      } else if (Number(value) < 0) {
        error = "Selling price cannot be negative.";
      } else if (
        currentProduct.purchasePrice !== "" &&
        Number(value) < Number(currentProduct.purchasePrice)
      ) {
        error = "Selling price cannot be less than purchase price.";
      }
    }

    // =========================
    // STOCK QUANTITY
    // =========================

    if (name === "stockQuantity") {
      if (value === "") {
        error = "Stock quantity is required.";
      } else if (Number(value) < 0) {
        error = "Stock quantity cannot be negative.";
      } else if (!Number.isInteger(Number(value))) {
        error = "Stock quantity must be a whole number.";
      }
    }

    // =========================
    // COLOR
    // =========================

    if (name === "color") {
      const color = value.trim();

      if (color && !/^[a-zA-Z\s]+$/.test(color)) {
        error = "Color should contain letters only.";
      } else if (color.length > 30) {
        error = "Color cannot exceed 30 characters.";
      }
    }

    // =========================
    // SIZE
    // =========================

    if (name === "size") {
      if (value.length > 30) {
        error = "Size cannot exceed 30 characters.";
      }
    }

    // =========================
    // STATUS
    // =========================

    if (name === "status") {
      if (value !== "Active" && value !== "Inactive") {
        error = "Please select a valid status.";
      }
    }

    // =========================
    // DESCRIPTION
    // =========================

    if (name === "description") {
      if (value.length > 500) {
        error = "Description cannot exceed 500 characters.";
      }
    }

    setErrors((previous) => ({
      ...previous,
      [name]: error,
    }));

    return error;
  };

  // =========================
  // VALIDATE COMPLETE FORM
  // =========================

  const validateForm = () => {
    const currentErrors = {};

    // Product Name
    const productName = product.productName.trim();

    if (!productName) {
      currentErrors.productName = "Product name is required.";
    } else if (productName.length < 2) {
      currentErrors.productName = "Product name must be at least 2 characters.";
    } else if (productName.length > 100) {
      currentErrors.productName = "Product name cannot exceed 100 characters.";
    }

    // Category
    if (!product.categoryId) {
      currentErrors.categoryId = "Please select a category.";
    }

    // Brand
    const brand = product.brand.trim();

    if (brand && !/^[a-zA-Z0-9\s.-]+$/.test(brand)) {
      currentErrors.brand = "Brand contains invalid characters.";
    } else if (brand.length > 50) {
      currentErrors.brand = "Brand cannot exceed 50 characters.";
    }

    // Model Number
    const modelNumber = product.modelNumber.trim();

    if (modelNumber.length > 50) {
      currentErrors.modelNumber = "Model number cannot exceed 50 characters.";
    }

    // =========================
    // BARCODE
    // =========================

    const barcode = product.barcode.trim();

    if (!barcode) {
      currentErrors.barcode = "Barcode is required.";
    } else if (!/^[a-zA-Z0-9-]+$/.test(barcode)) {
      currentErrors.barcode =
        "Barcode can contain letters, numbers and hyphen only.";
    } else if (barcode.length < 6) {
      currentErrors.barcode = "Barcode must contain at least 6 characters.";
    } else if (barcode.length > 20) {
      currentErrors.barcode = "Barcode cannot exceed 20 characters.";
    }

    // =========================
    // PURCHASE PRICE
    // =========================

    if (product.purchasePrice === "") {
      currentErrors.purchasePrice = "Purchase price is required.";
    } else if (Number(product.purchasePrice) < 0) {
      currentErrors.purchasePrice = "Purchase price cannot be negative.";
    }

    // =========================
    // SELLING PRICE
    // =========================

    if (product.sellingPrice === "") {
      currentErrors.sellingPrice = "Selling price is required.";
    } else if (Number(product.sellingPrice) < 0) {
      currentErrors.sellingPrice = "Selling price cannot be negative.";
    } else if (
      product.purchasePrice !== "" &&
      Number(product.sellingPrice) < Number(product.purchasePrice)
    ) {
      currentErrors.sellingPrice =
        "Selling price cannot be less than purchase price.";
    }

    // =========================
    // STOCK
    // =========================

    if (product.stockQuantity === "") {
      currentErrors.stockQuantity = "Stock quantity is required.";
    } else if (Number(product.stockQuantity) < 0) {
      currentErrors.stockQuantity = "Stock quantity cannot be negative.";
    } else if (!Number.isInteger(Number(product.stockQuantity))) {
      currentErrors.stockQuantity = "Stock quantity must be a whole number.";
    }

    // =========================
    // COLOR
    // =========================

    const color = product.color.trim();

    if (color && !/^[a-zA-Z\s]+$/.test(color)) {
      currentErrors.color = "Color should contain letters only.";
    } else if (color.length > 30) {
      currentErrors.color = "Color cannot exceed 30 characters.";
    }

    // =========================
    // SIZE
    // =========================

    if (product.size.length > 30) {
      currentErrors.size = "Size cannot exceed 30 characters.";
    }

    // =========================
    // STATUS
    // =========================

    if (product.status !== "Active" && product.status !== "Inactive") {
      currentErrors.status = "Please select a valid status.";
    }

    // =========================
    // DESCRIPTION
    // =========================

    if (product.description.length > 500) {
      currentErrors.description = "Description cannot exceed 500 characters.";
    }

    setErrors(currentErrors);

    return Object.keys(currentErrors).length === 0;
  };

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedProduct = {
      ...product,
      [name]: value,
    };

    setProduct(updatedProduct);

    validateField(name, value, updatedProduct);

    // Revalidate selling price
    // when purchase price changes
    if (name === "purchasePrice") {
      validateField(
        "sellingPrice",
        updatedProduct.sellingPrice,
        updatedProduct,
      );
    }

    // Revalidate purchase price
    // when selling price changes
    if (name === "sellingPrice") {
      validateField(
        "purchasePrice",
        updatedProduct.purchasePrice,
        updatedProduct,
      );
    }
  };

  // =========================
  // ADD PRODUCT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stop if validation fails
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

        purchasePrice: Number(product.purchasePrice),

        sellingPrice: Number(product.sellingPrice),

        stockQuantity: Number(product.stockQuantity),

        color: product.color.trim(),

        size: product.size.trim(),

        status: product.status,

        description: product.description.trim(),
      };

      console.log("Product Request:", requestData);

      const response = await api.post("/product", requestData);

      console.log("Product Response:", response.data);

      alert("Product added successfully.");

      // =========================
      // RESET FORM
      // =========================

      setProduct({
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

      setErrors({});
    } catch (error) {
      console.error("Add product error:", error);

      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to add product.");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // INPUT CLASS
  // =========================

  const inputClass = (field) => {
    return errors[field] ? "input-error" : "";
  };

  return (
    <div className="add-product-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="page-header">
        <div>
          <h2>Add Product</h2>

          <p>Create a new inventory item</p>
        </div>

        <div className="header-icon">
          <FaBoxOpen />
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
                className={inputClass("productName")}
              />

              {errors.productName && (
                <small className="validation-error">{errors.productName}</small>
              )}
            </div>

            {/* CATEGORY */}

            <div>
              <label>Category</label>

              <select
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
                className={inputClass("categoryId")}
              >
                <option value="">
                  {loadingCategories
                    ? "Loading categories..."
                    : "Select Category"}
                </option>

                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>

              {errors.categoryId && (
                <small className="validation-error">{errors.categoryId}</small>
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
                className={inputClass("brand")}
              />

              {errors.brand && (
                <small className="validation-error">{errors.brand}</small>
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
                className={inputClass("modelNumber")}
              />

              {errors.modelNumber && (
                <small className="validation-error">{errors.modelNumber}</small>
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
                placeholder="Example: RB2026001"
                className={inputClass("barcode")}
              />

              {errors.barcode && (
                <small className="validation-error">{errors.barcode}</small>
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
                className={inputClass("purchasePrice")}
              />

              {errors.purchasePrice && (
                <small className="validation-error">
                  {errors.purchasePrice}
                </small>
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
                className={inputClass("sellingPrice")}
              />

              {errors.sellingPrice && (
                <small className="validation-error">
                  {errors.sellingPrice}
                </small>
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
                className={inputClass("stockQuantity")}
              />

              {errors.stockQuantity && (
                <small className="validation-error">
                  {errors.stockQuantity}
                </small>
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
                className={inputClass("color")}
              />

              {errors.color && (
                <small className="validation-error">{errors.color}</small>
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
                className={inputClass("size")}
              />

              {errors.size && (
                <small className="validation-error">{errors.size}</small>
              )}
            </div>

            {/* STATUS */}

            <div>
              <label>Status</label>

              <select
                name="status"
                value={product.status}
                onChange={handleChange}
                className={inputClass("status")}
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>

              {errors.status && (
                <small className="validation-error">{errors.status}</small>
              )}
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
            className={inputClass("description")}
          />

          {errors.description && (
            <small className="validation-error">{errors.description}</small>
          )}
        </div>

        {/* =========================
            SAVE
        ========================= */}

        <button type="submit" className="save-btn" disabled={saving}>
          <FaSave />

          {saving ? "Saving Product..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
