import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaFileInvoiceDollar } from "react-icons/fa";
import api from "../../api/axios";
import "./CreateReceipt.css";

function CreateReceipt() {
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductResults, setShowProductResults] = useState(false);
  // =========================
  // CUSTOMER
  // =========================

  const [customerSearch, setCustomerSearch] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerResults, setShowCustomerResults] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);

  // CALCULATION STATE
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  // =========================
  // ITEMS
  // =========================

  const [items, setItems] = useState([
    {
      product: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  ]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/product");

      console.log("Product Response:", response.data);

      setProducts(response.data?.data || []);
    } catch (error) {
      console.error("Fetch products error:", error);
      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const keyword = productSearch.toLowerCase();

    return (
      product.productName?.toLowerCase().includes(keyword) ||
      product.brand?.toLowerCase().includes(keyword) ||
      product.barcode?.toLowerCase().includes(keyword) ||
      product.modelNumber?.toLowerCase().includes(keyword)
    );
  });

  // =========================
  // SEARCH CUSTOMERS
  // =========================

  useEffect(() => {
    const searchCustomers = async () => {
      if (!customerSearch.trim()) {
        setCustomers([]);
        setShowCustomerResults(false);
        return;
      }

      try {
        setCustomerLoading(true);

        const response = await api.get(
          `/customer/search?keyword=${encodeURIComponent(customerSearch)}`,
        );

        console.log("Customer Search Response:", response.data);

        setCustomers(response.data?.data || []);
        setShowCustomerResults(true);
      } catch (error) {
        console.error("Customer search error:", error);
        console.error("Backend error:", error.response?.data);

        setCustomers([]);
      } finally {
        setCustomerLoading(false);
      }
    };

    const timer = setTimeout(() => {
      searchCustomers();
    }, 300);

    return () => clearTimeout(timer);
  }, [customerSearch]);

  // =========================
  // SELECT CUSTOMER
  // =========================

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);

    setCustomerSearch(customer.customerName);

    setShowCustomerResults(false);

    console.log("Selected Customer:", customer);
  };

  // =========================
  // ADD ITEM
  // =========================

  const addItem = () => {
    setItems([
      ...items,
      {
        product: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  // =========================
  // REMOVE ITEM
  // =========================

  const removeItem = (index) => {
    if (items.length === 1) {
      return;
    }

    const updated = [...items];

    updated.splice(index, 1);

    setItems(updated);
  };

  // =========================
  // ITEM CHANGE
  // =========================

  const handleItemChange = (index, field, value) => {
    const updated = [...items];

    updated[index][field] = value;

    updated[index].total =
      Number(updated[index].quantity) * Number(updated[index].price);

    setItems(updated);
  };

  // =========================
  // BILL CALCULATION
  // =========================

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0,
  );

  const safeDiscount = Math.min(Math.max(Number(discount) || 0, 0), subtotal);

  const taxableAmount = subtotal - safeDiscount;

  const taxAmount = taxableAmount * ((Number(tax) || 0) / 100);

  const total = taxableAmount + taxAmount;

  const dueAmount = Math.max(total - (Number(paidAmount) || 0), 0);

  // =========================
  // GENERATE RECEIPT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCustomer) {
      alert("Please select a customer.");
      return;
    }

    console.log("Customer ID:", selectedCustomer.customerId);

    console.log("Receipt Data:", {
      customerId: selectedCustomer.customerId,
      customerName: selectedCustomer.customerName,
      items,
      subtotal,
      discount,
      tax,
      total,
    });

    alert("Receipt generated successfully.");
  };

  return (
    <div className="receipt-container">
      {/* =========================
          HEADER
      ========================= */}

      <div className="receipt-header">
        <div>
          <h2>Create Receipt</h2>

          <p>Generate customer invoice</p>
        </div>

        <div className="header-icon">
          <FaFileInvoiceDollar />
        </div>
      </div>

      {/* =========================
          CUSTOMER INFORMATION
      ========================= */}

      <div className="receipt-card">
        <h3>Customer Information</h3>

        <div className="grid-3">
          {/* CUSTOMER SEARCH */}

          <div className="customer-search-container">
            <label>
              Customer <span className="required">*</span>
            </label>

            <input
              type="text"
              placeholder="Search customer by name..."
              value={customerSearch}
              onChange={(e) => {
                setCustomerSearch(e.target.value);
                setSelectedCustomer(null);
              }}
              onFocus={() => {
                if (customerSearch.trim()) {
                  setShowCustomerResults(true);
                }
              }}
              autoComplete="off"
            />

            {/* SEARCH RESULTS */}

            {showCustomerResults && (
              <div className="customer-results">
                {customerLoading ? (
                  <div className="customer-result-message">
                    Searching customers...
                  </div>
                ) : customers.length > 0 ? (
                  customers.map((customer) => (
                    <div
                      key={customer.customerId}
                      className="customer-result"
                      onClick={() => handleCustomerSelect(customer)}
                    >
                      <strong>{customer.customerName}</strong>

                      <small>{customer.mobileNumber}</small>
                    </div>
                  ))
                ) : (
                  <div className="customer-result-message">
                    No customers found.
                  </div>
                )}
              </div>
            )}

            {/* SELECTED CUSTOMER INFO */}

            {selectedCustomer && (
              <div className="selected-customer">
                <strong>{selectedCustomer.customerName}</strong>

                <span>{selectedCustomer.mobileNumber}</span>
              </div>
            )}
          </div>

          {/* BILL DATE */}

          <div>
            <label>Bill Date</label>

            <input
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
      </div>

      {/* =========================
          PRODUCTS
      ========================= */}

      <div className="receipt-card">
        <div className="product-header">
          <h3>Products</h3>

          <button type="button" onClick={addItem} className="add-product-btn">
            <FaPlus />
            Add Item
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="product-search-cell">
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={item.product}
                    onChange={(e) => {
                      handleItemChange(index, "product", e.target.value);

                      setProductSearch(e.target.value);
                      setSelectedProduct(null);
                      setShowProductResults(true);
                    }}
                    onFocus={() => {
                      if (item.product.trim()) {
                        setProductSearch(item.product);
                        setShowProductResults(true);
                      }
                    }}
                    autoComplete="off"
                  />

                  {showProductResults && productSearch.trim() !== "" && (
                    <div className="product-results">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <div
                            key={product.productId}
                            className="product-result"
                            onClick={() => {
                              setSelectedProduct(product);

                              setProductSearch(product.productName);

                              setShowProductResults(false);

                              handleItemChange(
                                index,
                                "product",
                                product.productName,
                              );

                              handleItemChange(
                                index,
                                "price",
                                Number(product.sellingPrice) || 0,
                              );
                            }}
                          >
                            <strong>{product.productName}</strong>

                            <small>
                              {product.brand}
                              {" • "}₹{product.sellingPrice}
                            </small>
                          </div>
                        ))
                      ) : (
                        <div className="product-result-message">
                          No products found.
                        </div>
                      )}
                    </div>
                  )}
                </td>

                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value),
                      )
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", Number(e.target.value))
                    }
                  />
                </td>

                <td>₹{Number(item.total).toFixed(2)}</td>

                <td>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="delete-btn"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================
          BILL SUMMARY
      ========================= */}

      <div className="receipt-card">
        <h3>Bill Summary</h3>

        <div className="summary">
          {/* SUBTOTAL */}

          <div>
            <span>Subtotal</span>

            <strong>₹{subtotal.toFixed(2)}</strong>
          </div>

          {/* DISCOUNT */}

          <div>
            <label>Discount</label>

            <input
              type="number"
              min="0"
              max={subtotal}
              step="0.01"
              value={discount}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value <= subtotal) {
                  setDiscount(value);
                }
              }}
            />
          </div>

          {/* TAX */}

          <div>
            <label>Tax (%)</label>

            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={tax}
              onChange={(e) => {
                const value = Number(e.target.value);

                if (value >= 0 && value <= 100) {
                  setTax(value);
                }
              }}
            />
          </div>

          {/* TAX AMOUNT */}

          <div>
            <span>Tax Amount</span>

            <strong>₹{taxAmount.toFixed(2)}</strong>
          </div>

          {/* GRAND TOTAL */}

          <div className="grand-total">
            <span>Total</span>

            <strong>₹{Math.max(total, 0).toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* =========================
          PAYMENT
      ========================= */}

      <div className="receipt-card">
        <h3>Payment Details</h3>

        <div className="grid-3">
          <div>
            <label>Payment Method</label>

            <select>
              <option value="Cash">Cash</option>

              <option value="Card">Card</option>

              <option value="UPI">UPI</option>
            </select>
          </div>

          <div>
            <label>Paid Amount</label>

            <input type="number" min="0" />
          </div>

          <div>
            <label>Due Amount</label>

            <input type="number" min="0" value={Math.max(total, 0)} readOnly />
          </div>
        </div>
      </div>

      {/* =========================
          GENERATE RECEIPT
      ========================= */}

      <button type="button" className="generate-btn" onClick={handleSubmit}>
        <FaFileInvoiceDollar />
        Generate Receipt
      </button>
    </div>
  );
}

export default CreateReceipt;
