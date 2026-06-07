import { useState } from "react";
import { FaSave, FaBoxOpen } from "react-icons/fa";
import "./AddProduct.css";

function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
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

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(product);

    alert("Product Added Successfully");
  };

  return (
    <div className="add-product-page">

      {/* Header */}

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

        {/* Product Information */}

        <div className="product-card">

          <h3>Product Information</h3>

          <div className="grid-3">

            <div>
              <label>Product Name</label>

              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Category</label>

              <select
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option>Frames</option>
                <option>Lenses</option>
                <option>Accessories</option>
                <option>Contact Lens</option>
              </select>
            </div>

            <div>
              <label>Brand</label>

              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Model Number</label>

              <input
                type="text"
                name="modelNumber"
                value={product.modelNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Barcode</label>

              <input
                type="text"
                name="barcode"
                value={product.barcode}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>

        {/* Pricing */}

        <div className="product-card">

          <h3>Pricing Information</h3>

          <div className="grid-3">

            <div>
              <label>Purchase Price</label>

              <input
                type="number"
                name="purchasePrice"
                value={product.purchasePrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Selling Price</label>

              <input
                type="number"
                name="sellingPrice"
                value={product.sellingPrice}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>

        {/* Inventory */}

        <div className="product-card">

          <h3>Inventory Information</h3>

          <div className="grid-3">

            <div>
              <label>Stock Quantity</label>

              <input
                type="number"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Color</label>

              <input
                type="text"
                name="color"
                value={product.color}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Size</label>

              <input
                type="text"
                name="size"
                value={product.size}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Status</label>

              <select
                name="status"
                value={product.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

          </div>

        </div>

        {/* Description */}

        <div className="product-card">

          <h3>Description</h3>

          <textarea
            rows="5"
            name="description"
            value={product.description}
            onChange={handleChange}
          />

        </div>

        <button
          type="submit"
          className="save-btn"
        >
          <FaSave />
          Save Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;