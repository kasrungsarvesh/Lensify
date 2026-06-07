import { useState } from "react";
import { FaPlus, FaTrash, FaFileInvoiceDollar } from "react-icons/fa";
import "./CreateReceipt.css";

function CreateReceipt() {
  const [items, setItems] = useState([
    {
      product: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  ]);

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

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleItemChange = (
    index,
    field,
    value
  ) => {
    const updated = [...items];

    updated[index][field] = value;

    updated[index].total =
      updated[index].quantity *
      updated[index].price;

    setItems(updated);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );

  const discount = 500;
  const tax = subtotal * 0.05;

  const total =
    subtotal - discount + tax;

  return (
    <div className="receipt-container">

      {/* Header */}

      <div className="receipt-header">

        <div>
          <h2>Create Receipt</h2>
          <p>
            Generate customer invoice
          </p>
        </div>

        <div className="header-icon">
          <FaFileInvoiceDollar />
        </div>

      </div>

      {/* Customer Info */}

      <div className="receipt-card">

        <h3>Customer Information</h3>

        <div className="grid-3">

          <div>
            <label>Customer</label>

            <select>
              <option>
                Rahul Sharma
              </option>

              <option>
                Priya Patel
              </option>
            </select>
          </div>

          <div>
            <label>Prescription</label>

            <select>
              <option>
                PRE001
              </option>

              <option>
                PRE002
              </option>
            </select>
          </div>

          <div>
            <label>Bill Date</label>

            <input
              type="date"
            />
          </div>

        </div>

      </div>

      {/* Products */}

      <div className="receipt-card">

        <div className="product-header">

          <h3>Products</h3>

          <button
            onClick={addItem}
            className="add-product-btn"
          >
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
              <th></th>
            </tr>

          </thead>

          <tbody>

            {items.map(
              (item, index) => (
                <tr key={index}>

                  <td>

                    <input
                      value={
                        item.product
                      }
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "product",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="number"
                      value={
                        item.quantity
                      }
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          Number(
                            e.target.value
                          )
                        )
                      }
                    />

                  </td>

                  <td>

                    <input
                      type="number"
                      value={
                        item.price
                      }
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "price",
                          Number(
                            e.target.value
                          )
                        )
                      }
                    />

                  </td>

                  <td>
                    ₹{item.total}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        removeItem(
                          index
                        )
                      }
                      className="delete-btn"
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* Summary */}

      <div className="receipt-card">

        <h3>Bill Summary</h3>

        <div className="summary">

          <div>
            <span>Subtotal</span>
            <strong>
              ₹{subtotal}
            </strong>
          </div>

          <div>
            <span>Discount</span>
            <strong>
              ₹{discount}
            </strong>
          </div>

          <div>
            <span>Tax (5%)</span>
            <strong>
              ₹{tax.toFixed(2)}
            </strong>
          </div>

          <div className="grand-total">
            <span>Total</span>
            <strong>
              ₹{total.toFixed(2)}
            </strong>
          </div>

        </div>

      </div>

      {/* Payment */}

      <div className="receipt-card">

        <h3>Payment Details</h3>

        <div className="grid-3">

          <div>
            <label>
              Payment Method
            </label>

            <select>
              <option>
                Cash
              </option>

              <option>
                Card
              </option>

              <option>
                UPI
              </option>
            </select>
          </div>

          <div>
            <label>
              Paid Amount
            </label>

            <input
              type="number"
            />
          </div>

          <div>
            <label>
              Due Amount
            </label>

            <input
              type="number"
            />
          </div>

        </div>

      </div>

      <button className="generate-btn">
        Generate Receipt
      </button>

    </div>
  );
}

export default CreateReceipt;