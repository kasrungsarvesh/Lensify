import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaFileInvoiceDollar,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import "./CreateReceipt.css";

function CreateReceipt() {
  const navigate = useNavigate();

  // =========================================================
  // PRODUCTS
  // =========================================================

  const [products, setProducts] = useState([]);

  const [productSearches, setProductSearches] = useState([""]);
  const [productResults, setProductResults] = useState([[]]);
  const [productSearching, setProductSearching] = useState([false]);

  // =========================================================
  // LENSES
  // =========================================================

  const [lenses, setLenses] = useState([]);

  const [lensSearches, setLensSearches] = useState([""]);
  const [lensResults, setLensResults] = useState([[]]);
  const [lensSearching, setLensSearching] = useState([false]);

  // =========================================================
  // CUSTOMER
  // =========================================================

  const [customerSearch, setCustomerSearch] = useState("");
  const [customers, setCustomers] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [showCustomerResults, setShowCustomerResults] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);

  // =========================================================
  // BILL
  // =========================================================

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  // =========================================================
  // PAYMENT
  // =========================================================

  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [paidAmount, setPaidAmount] = useState(0);

  // =========================================================
  // GENERATING
  // =========================================================

  const [generating, setGenerating] = useState(false);

  // =========================================================
  // PRODUCT ITEMS
  // =========================================================

  const [productItems, setProductItems] = useState([
    {
      productId: null,
      product: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  ]);

  // =========================================================
  // LENS ITEMS
  // =========================================================

  const [lensItems, setLensItems] = useState([
    {
      lensId: null,
      lens: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  ]);

  // =========================================================
  // FETCH PRODUCTS
  // =========================================================

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

  // =========================================================
  // FETCH LENSES
  // =========================================================

  const fetchLenses = async () => {
    try {
      const response = await api.get("/lenses");

      console.log("Lens Response:", response.data);

      const allLenses = response.data?.data || [];

      // Only active lenses are available for new receipts
      const activeLenses = allLenses.filter((lens) => lens.status === true);

      setLenses(activeLenses);
    } catch (error) {
      console.error("Fetch lenses error:", error);
      console.error("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Unable to fetch lenses.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchLenses();
  }, []);

  // =========================================================
  // CUSTOMER SEARCH
  // Same behavior as AddPrescription
  // =========================================================

  useEffect(() => {
    const searchCustomerData = async () => {
      if (!customerSearch.trim()) {
        setCustomers([]);
        setShowCustomerResults(false);
        return;
      }

      if (selectedCustomer) {
        return;
      }

      try {
        setCustomerLoading(true);

        const response = await api.get(
          `/customer/search?keyword=${encodeURIComponent(
            customerSearch.trim(),
          )}`,
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

    const timer = setTimeout(searchCustomerData, 350);

    return () => clearTimeout(timer);
  }, [customerSearch, selectedCustomer]);

  // =========================================================
  // PRODUCT AUTOCOMPLETE
  // =========================================================

  useEffect(() => {
    const timers = [];

    productSearches.forEach((search, index) => {
      if (!search?.trim()) {
        setProductResults((previous) => {
          const updated = [...previous];
          updated[index] = [];
          return updated;
        });

        setProductSearching((previous) => {
          const updated = [...previous];
          updated[index] = false;
          return updated;
        });

        return;
      }

      setProductSearching((previous) => {
        const updated = [...previous];
        updated[index] = true;
        return updated;
      });

      const timer = setTimeout(() => {
        const keyword = search.trim().toLowerCase();

        const results = products.filter((product) => {
          return (
            product.productName?.toLowerCase().includes(keyword) ||
            product.brand?.toLowerCase().includes(keyword) ||
            product.barcode?.toLowerCase().includes(keyword) ||
            product.modelNumber?.toLowerCase().includes(keyword)
          );
        });

        setProductResults((previous) => {
          const updated = [...previous];
          updated[index] = results;
          return updated;
        });

        setProductSearching((previous) => {
          const updated = [...previous];
          updated[index] = false;
          return updated;
        });
      }, 350);

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [productSearches, products]);

  // =========================================================
  // LENS AUTOCOMPLETE
  // =========================================================

  useEffect(() => {
    const timers = [];

    lensSearches.forEach((search, index) => {
      if (!search?.trim()) {
        setLensResults((previous) => {
          const updated = [...previous];
          updated[index] = [];
          return updated;
        });

        setLensSearching((previous) => {
          const updated = [...previous];
          updated[index] = false;
          return updated;
        });

        return;
      }

      setLensSearching((previous) => {
        const updated = [...previous];
        updated[index] = true;
        return updated;
      });

      const timer = setTimeout(() => {
        const keyword = search.trim().toLowerCase();

        const results = lenses.filter((lens) => {
          // Never show inactive lenses in receipt selection
          if (lens.status !== true) {
            return false;
          }

          return (
            lens.brand?.toLowerCase().includes(keyword) ||
            lens.lensType?.toLowerCase().includes(keyword) ||
            lens.lensMaterial?.toLowerCase().includes(keyword) ||
            String(lens.power ?? "")
              .toLowerCase()
              .includes(keyword)
          );
        });
        setLensResults((previous) => {
          const updated = [...previous];
          updated[index] = results;
          return updated;
        });

        setLensSearching((previous) => {
          const updated = [...previous];
          updated[index] = false;
          return updated;
        });
      }, 350);

      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [lensSearches, lenses]);

  // =========================================================
  // SELECT CUSTOMER
  // =========================================================

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);

    setCustomerSearch("");
    setCustomers([]);
    setShowCustomerResults(false);

    console.log("Selected Customer:", customer);
  };

  // =========================================================
  // REMOVE CUSTOMER
  // =========================================================

  const handleRemoveCustomer = () => {
    setSelectedCustomer(null);

    setCustomerSearch("");
    setCustomers([]);
    setShowCustomerResults(false);
  };

  // =========================================================
  // PRODUCT SEARCH CHANGE
  // =========================================================

  const handleProductSearchChange = (index, value) => {
    setProductSearches((previous) => {
      const updated = [...previous];
      updated[index] = value;
      return updated;
    });

    setProductItems((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        productId: null,
        product: value,
      };

      updated[index].total =
        Number(updated[index].quantity || 0) *
        Number(updated[index].price || 0);

      return updated;
    });
  };

  // =========================================================
  // SELECT PRODUCT
  // =========================================================

  const handleProductSelect = (index, product) => {
    const price = Number(product.sellingPrice) || 0;

    setProductItems((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        productId: product.productId,
        product: product.productName || "",
        quantity: 1,
        price,
        total: price,
      };

      return updated;
    });

    setProductSearches((previous) => {
      const updated = [...previous];
      updated[index] = "";
      return updated;
    });

    setProductResults((previous) => {
      const updated = [...previous];
      updated[index] = [];
      return updated;
    });
  };

  // =========================================================
  // PRODUCT ITEM CHANGE
  // =========================================================

  const handleProductItemChange = (index, field, value) => {
    setProductItems((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      updated[index].total =
        Number(updated[index].quantity || 0) *
        Number(updated[index].price || 0);

      return updated;
    });
  };

  // =========================================================
  // ADD PRODUCT
  // =========================================================

  const addProductItem = () => {
    setProductItems((previous) => [
      ...previous,
      {
        productId: null,
        product: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);

    setProductSearches((previous) => [...previous, ""]);

    setProductResults((previous) => [...previous, []]);

    setProductSearching((previous) => [...previous, false]);
  };

  // =========================================================
  // REMOVE PRODUCT
  // =========================================================

  const removeProductItem = (index) => {
    if (productItems.length === 1) {
      return;
    }

    setProductItems((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );

    setProductSearches((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );

    setProductResults((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );

    setProductSearching((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  // =========================================================
  // LENS SEARCH CHANGE
  // =========================================================

  const handleLensSearchChange = (index, value) => {
    setLensSearches((previous) => {
      const updated = [...previous];
      updated[index] = value;
      return updated;
    });

    setLensItems((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        lensId: null,
        lens: value,
      };

      updated[index].total =
        Number(updated[index].quantity || 0) *
        Number(updated[index].price || 0);

      return updated;
    });
  };

  // =========================================================
  // SELECT LENS
  // =========================================================

  const handleLensSelect = (index, lens) => {
    // Extra protection: inactive lenses cannot be selected
    if (lens.status !== true) {
      alert("This lens is inactive and cannot be added to a receipt.");
      return;
    }

    const price = Number(lens.price) || 0;

    const lensName = `${lens.brand} - ${lens.lensType || "Lens"}`;

    setLensItems((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        lensId: lens.lensId,
        lens: lensName,
        quantity: 1,
        price,
        total: price,
      };

      return updated;
    });

    setLensSearches((previous) => {
      const updated = [...previous];
      updated[index] = "";
      return updated;
    });

    setLensResults((previous) => {
      const updated = [...previous];
      updated[index] = [];
      return updated;
    });
  };

  // =========================================================
  // LENS ITEM CHANGE
  // =========================================================

  const handleLensItemChange = (index, field, value) => {
    setLensItems((previous) => {
      const updated = [...previous];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      updated[index].total =
        Number(updated[index].quantity || 0) *
        Number(updated[index].price || 0);

      return updated;
    });
  };

  // =========================================================
  // ADD LENS
  // =========================================================

  const addLensItem = () => {
    setLensItems((previous) => [
      ...previous,
      {
        lensId: null,
        lens: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);

    setLensSearches((previous) => [...previous, ""]);

    setLensResults((previous) => [...previous, []]);

    setLensSearching((previous) => [...previous, false]);
  };

  // =========================================================
  // REMOVE LENS
  // =========================================================

  const removeLensItem = (index) => {
    if (lensItems.length === 1) {
      return;
    }

    setLensItems((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );

    setLensSearches((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );

    setLensResults((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );

    setLensSearching((previous) =>
      previous.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  // =========================================================
  // CALCULATIONS
  // =========================================================

  const productSubtotal = productItems.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0,
  );

  const lensSubtotal = lensItems.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0,
  );

  const subtotal = productSubtotal + lensSubtotal;

  const safeDiscount = Math.min(Math.max(Number(discount) || 0, 0), subtotal);

  const taxableAmount = subtotal - safeDiscount;

  const taxAmount = taxableAmount * ((Number(tax) || 0) / 100);

  const total = taxableAmount + taxAmount;

  const safePaidAmount = Math.min(Math.max(Number(paidAmount) || 0, 0), total);

  const dueAmount = Math.max(total - safePaidAmount, 0);

  // =========================================================
  // GENERATE RECEIPT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =======================================================
    // CUSTOMER VALIDATION
    // =======================================================

    if (!selectedCustomer) {
      alert("Please select a customer.");
      return;
    }

    // =======================================================
    // GET ONLY SELECTED FRAME ITEMS
    // Empty frame rows are ignored
    // =======================================================

    const selectedProductItems = productItems.filter((item) => item.productId);

    // =======================================================
    // VALIDATE SELECTED FRAME ITEMS
    // =======================================================

    const invalidProduct = selectedProductItems.some(
      (item) => Number(item.quantity) < 1 || Number(item.price) < 0,
    );

    if (invalidProduct) {
      alert("Please enter valid quantity and price for the selected frame.");
      return;
    }

    // =======================================================
    // GET ONLY SELECTED LENS ITEMS
    // Empty lens rows are ignored
    // =======================================================

    const selectedLensItems = lensItems.filter((item) => item.lensId);

    // =======================================================
    // VALIDATE SELECTED LENS ITEMS
    // =======================================================

    const invalidLens = selectedLensItems.some(
      (item) => Number(item.quantity) < 1 || Number(item.price) < 0,
    );

    if (invalidLens) {
      alert("Please enter valid quantity and price for the selected lens.");
      return;
    }

    // =======================================================
    // AT LEAST ONE ITEM
    // =======================================================

    if (selectedProductItems.length === 0 && selectedLensItems.length === 0) {
      alert("Please add at least one frame or lens.");
      return;
    }

    // =======================================================
    // DISCOUNT VALIDATION
    // =======================================================

    if (Number(discount) < 0 || Number(discount) > subtotal) {
      alert("Discount cannot be greater than subtotal.");
      return;
    }

    // =======================================================
    // PAID AMOUNT VALIDATION
    // =======================================================

    const enteredPaidAmount = Number(paidAmount) || 0;

    if (enteredPaidAmount < 0) {
      alert("Paid amount cannot be negative.");
      return;
    }

    if (enteredPaidAmount > total) {
      alert(`Paid amount cannot exceed total amount of ₹${total.toFixed(2)}.`);
      return;
    }

    try {
      setGenerating(true);

      // =====================================================
      // PREPARE ORDER ITEMS
      // =====================================================

      const orderItems = [
        ...selectedProductItems.map((item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),

        ...selectedLensItems.map((item) => ({
          lensId: Number(item.lensId),
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
      ];

      console.log("Order Items:", orderItems);

      // =====================================================
      // CREATE ORDER
      // =====================================================

      const orderRequest = {
        customerId: Number(selectedCustomer.customerId),

        status: "PENDING",

        items: orderItems,
      };

      console.log("Creating Order:", orderRequest);

      const orderResponse = await api.post("/orders", orderRequest);

      console.log("Order Response:", orderResponse.data);

      const createdOrder = orderResponse.data?.data;

      if (!createdOrder?.orderId) {
        throw new Error("Order was created but orderId was not returned.");
      }

      // =====================================================
      // CREATE BILL
      // =====================================================

      const billRequest = {
        customerId: Number(selectedCustomer.customerId),

        orderId: createdOrder.orderId,

        subtotal: Number(subtotal.toFixed(2)),

        discount: Number(safeDiscount.toFixed(2)),

        gst: Number(taxAmount.toFixed(2)),
      };

      console.log("Creating Bill:", billRequest);

      const billResponse = await api.post("/bills", billRequest);

      console.log("Bill Response:", billResponse.data);

      const createdBill = billResponse.data?.data;

      if (!createdBill?.billId) {
        throw new Error("Bill was created but billId was not returned.");
      }

      // =====================================================
      // CREATE PAYMENT
      //
      // Do NOT create a payment record for ₹0.
      // A zero payment means no payment has been made.
      // =====================================================

      let createdPayment = null;

      if (enteredPaidAmount > 0) {
        const paymentStatus = enteredPaidAmount >= total ? "PAID" : "PARTIAL";

        const paymentRequest = {
          billId: createdBill.billId,

          paymentType: paymentMethod,

          amount: Number(enteredPaidAmount.toFixed(2)),

          status: paymentStatus,
        };

        console.log("Creating Payment:", paymentRequest);

        const paymentResponse = await api.post("/payments", paymentRequest);

        console.log("Payment Response:", paymentResponse.data);

        if (!paymentResponse.data?.success) {
          throw new Error(
            paymentResponse.data?.message || "Payment could not be created.",
          );
        }

        createdPayment = paymentResponse.data?.data;
      }

      // =====================================================
      // SUCCESS ALERT
      // =====================================================

      window.alert(
        `Receipt Generated Successfully!\n\n` +
          `Bill No: BILL${String(createdBill.billId).padStart(3, "0")}\n` +
          `Customer: ${selectedCustomer.customerName}\n` +
          `Order ID: ${createdOrder.orderId}\n` +
          `Total: ₹${total.toFixed(2)}\n` +
          `Paid: ₹${enteredPaidAmount.toFixed(2)}\n` +
          `Due: ₹${dueAmount.toFixed(2)}\n` +
          `Status: ${
            enteredPaidAmount >= total
              ? "PAID"
              : enteredPaidAmount > 0
                ? "PARTIAL"
                : "PENDING"
          }`,
      );

      console.log("Receipt Created Successfully:", {
        customer: selectedCustomer,
        order: createdOrder,
        bill: createdBill,
        payment: createdPayment,
      });

      // =====================================================
      // REDIRECT TO RECEIPT LIST
      // =====================================================

      navigate("/receipts");
    } catch (error) {
      console.error("Generate receipt error:", error);

      console.error("Backend error:", error.response?.data);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to generate receipt.",
      );
    } finally {
      setGenerating(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="receipt-container">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="receipt-header">
        <div>
          <h2>Create Receipt</h2>

          <p>Generate customer invoice</p>
        </div>

        <div className="header-icon">
          <FaFileInvoiceDollar />
        </div>
      </div>

      {/* =====================================================
          CUSTOMER INFORMATION
      ===================================================== */}

      <div className="receipt-card">
        <h3>Customer Information</h3>

        <div className="grid-3">
          <div className="customer-search-container">
            <label>
              Customer <span className="required">*</span>
            </label>

            {!selectedCustomer ? (
              <>
                <div className="customer-search-box">
                  <FaSearch />

                  <input
                    type="text"
                    placeholder="Search by name, code or mobile..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    autoComplete="off"
                  />

                  {customerLoading && (
                    <span className="search-loader">...</span>
                  )}
                </div>

                {customerSearch.trim() &&
                  !customerLoading &&
                  showCustomerResults && (
                    <div className="customer-results">
                      {customers.length > 0 ? (
                        customers.map((customer) => (
                          <button
                            type="button"
                            key={customer.customerId}
                            className="customer-result"
                            onClick={() => handleCustomerSelect(customer)}
                          >
                            <div className="customer-result-avatar">
                              {customer.customerName?.charAt(0)?.toUpperCase()}
                            </div>

                            <div className="customer-result-info">
                              <div className="customer-result-name">
                                {customer.customerName}
                              </div>

                              <div className="customer-result-meta">
                                <span>{customer.customerCode}</span>

                                <span>•</span>

                                <span>{customer.mobileNumber}</span>

                                {customer.city && (
                                  <>
                                    <span>•</span>

                                    <span>{customer.city}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="customer-result-message">
                          No customer found.
                        </div>
                      )}
                    </div>
                  )}
              </>
            ) : (
              <div className="selected-customer">
                <div>
                  <strong>{selectedCustomer.customerName}</strong>

                  <span>{selectedCustomer.mobileNumber}</span>
                </div>

                <button
                  type="button"
                  className="remove-customer"
                  onClick={handleRemoveCustomer}
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          <div>
            <label>Bill Date</label>

            <input
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          FRAMES / PRODUCTS
      ===================================================== */}

      <div className="receipt-card">
        <div className="product-header">
          <div>
            <h3>Frames / Products</h3>

            <p>Add frame or product purchased by the customer.</p>
          </div>

          <button
            type="button"
            onClick={addProductItem}
            className="add-product-btn"
          >
            <FaPlus />
            Add Frame
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Frame / Product</th>

              <th>Qty</th>

              <th>Price</th>

              <th>Total</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {productItems.map((item, index) => {
              const search = productSearches[index] || "";

              const results = productResults[index] || [];

              const searching = productSearching[index] || false;

              return (
                <tr key={index}>
                  <td className="product-search-cell">
                    <div className="customer-search-box">
                      <FaSearch />

                      <input
                        type="text"
                        placeholder="Search frame / product..."
                        value={search.trim() ? search : item.product}
                        onChange={(e) =>
                          handleProductSearchChange(index, e.target.value)
                        }
                        autoComplete="off"
                      />

                      {searching && <span className="search-loader">...</span>}
                    </div>

                    {search.trim() && !searching && (
                      <div className="customer-results">
                        {results.length > 0 ? (
                          results.map((product) => (
                            <button
                              type="button"
                              key={product.productId}
                              className="customer-result"
                              onClick={() =>
                                handleProductSelect(index, product)
                              }
                            >
                              <div className="customer-result-avatar">
                                {product.productName?.charAt(0)?.toUpperCase()}
                              </div>

                              <div className="customer-result-info">
                                <div className="customer-result-name">
                                  {product.productName}
                                </div>

                                <div className="customer-result-meta">
                                  {product.brand && (
                                    <span>{product.brand}</span>
                                  )}

                                  {product.brand && product.modelNumber && (
                                    <span>•</span>
                                  )}

                                  {product.modelNumber && (
                                    <span>{product.modelNumber}</span>
                                  )}

                                  {product.sellingPrice != null && (
                                    <>
                                      <span>•</span>

                                      <span>₹{product.sellingPrice}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="customer-result-message">
                            No product found.
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
                        handleProductItemChange(
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
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        handleProductItemChange(
                          index,
                          "price",
                          Number(e.target.value),
                        )
                      }
                    />
                  </td>

                  <td>₹{Number(item.total || 0).toFixed(2)}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => removeProductItem(index)}
                      className="delete-btn"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          LENSES
      ===================================================== */}

      <div className="receipt-card">
        <div className="product-header">
          <div>
            <h3>Lenses</h3>

            <p>Add prescription or optical lenses purchased by the customer.</p>
          </div>

          <button
            type="button"
            onClick={addLensItem}
            className="add-product-btn"
          >
            <FaPlus />
            Add Lens
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Lens</th>

              <th>Power</th>

              <th>Qty</th>

              <th>Price</th>

              <th>Total</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {lensItems.map((item, index) => {
              const search = lensSearches[index] || "";

              const results = lensResults[index] || [];

              const searching = lensSearching[index] || false;

              const selectedLens = lenses.find(
                (lens) => lens.lensId === item.lensId,
              );

              return (
                <tr key={index}>
                  <td className="product-search-cell">
                    <div className="customer-search-box">
                      <FaSearch />

                      <input
                        type="text"
                        placeholder="Search lens by brand, type, material..."
                        value={search.trim() ? search : item.lens}
                        onChange={(e) =>
                          handleLensSearchChange(index, e.target.value)
                        }
                        autoComplete="off"
                      />

                      {searching && <span className="search-loader">...</span>}
                    </div>

                    {search.trim() && !searching && (
                      <div className="customer-results">
                        {results.length > 0 ? (
                          results.map((lens) => (
                            <button
                              type="button"
                              key={lens.lensId}
                              className="customer-result"
                              onClick={() => handleLensSelect(index, lens)}
                            >
                              <div className="customer-result-avatar">
                                {lens.brand?.charAt(0)?.toUpperCase()}
                              </div>

                              <div className="customer-result-info">
                                <div className="customer-result-name">
                                  {lens.brand} - {lens.lensType || "Lens"}
                                </div>

                                <div className="customer-result-meta">
                                  <span>
                                    {lens.lensMaterial || "Material N/A"}
                                  </span>

                                  <span>•</span>

                                  <span>Power: {lens.power ?? "N/A"}</span>

                                  <span>•</span>

                                  <span>₹{lens.price}</span>
                                </div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="customer-result-message">
                            No lens found.
                          </div>
                        )}
                      </div>
                    )}
                  </td>

                  <td>{selectedLens ? selectedLens.power : "-"}</td>

                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleLensItemChange(
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
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        handleLensItemChange(
                          index,
                          "price",
                          Number(e.target.value),
                        )
                      }
                    />
                  </td>

                  <td>₹{Number(item.total || 0).toFixed(2)}</td>

                  <td>
                    <button
                      type="button"
                      onClick={() => removeLensItem(index)}
                      className="delete-btn"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          BILL SUMMARY
      ===================================================== */}

      <div className="receipt-card">
        <h3>Bill Summary</h3>

        <div className="summary">
          <div>
            <span>Subtotal</span>

            <strong>₹{subtotal.toFixed(2)}</strong>
          </div>

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

                setDiscount(Math.min(Math.max(value || 0, 0), subtotal));
              }}
            />
          </div>

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

                setTax(Math.min(Math.max(value || 0, 0), 100));
              }}
            />
          </div>

          <div>
            <span>Tax Amount</span>

            <strong>₹{taxAmount.toFixed(2)}</strong>
          </div>

          <div className="grand-total">
            <span>Total</span>

            <strong>₹{total.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* =====================================================
          PAYMENT
      ===================================================== */}

      <div className="receipt-card">
        <h3>Payment Details</h3>

        <div className="grid-3">
          <div>
            <label>Payment Method</label>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="CASH">Cash</option>

              <option value="CARD">Card</option>

              <option value="UPI">UPI</option>
            </select>
          </div>

          <div>
            <label>Paid Amount</label>

            <input
              type="number"
              min="0"
              max={total}
              step="0.01"
              value={paidAmount}
              onChange={(e) => {
                const value = Number(e.target.value);

                setPaidAmount(Math.min(Math.max(value || 0, 0), total));
              }}
            />
          </div>

          <div>
            <label>Due Amount</label>

            <input
              type="number"
              min="0"
              value={dueAmount.toFixed(2)}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          GENERATE RECEIPT
      ===================================================== */}

      <button
        type="button"
        className="generate-btn"
        onClick={handleSubmit}
        disabled={generating}
      >
        <FaFileInvoiceDollar />

        {generating ? "Generating Receipt..." : "Generate Receipt"}
      </button>
    </div>
  );
}

export default CreateReceipt;
