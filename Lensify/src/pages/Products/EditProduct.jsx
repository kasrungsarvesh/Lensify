import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaSave, FaEdit } from "react-icons/fa";
import "./AddProduct.css";

function EditProduct() {
  const { id } = useParams();

  const [product, setProduct] = useState({
    productName: "RayBan RB3025",
    category: "Frames",
    brand: "RayBan",
    modelNumber: "RB3025",
    barcode: "RB2026001",

    purchasePrice: "1800",
    sellingPrice: "2500",

    stockQuantity: "25",
    color: "Black",
    size: "Medium",

    status: "Active",

    description:
      "Premium RayBan Aviator frame.",
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

    alert("Product Updated Successfully");
  };

  return (
    <div className="add-product-page">

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
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;