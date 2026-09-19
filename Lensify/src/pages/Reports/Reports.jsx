import { useEffect, useMemo, useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
  FaBoxOpen,
  FaSyncAlt,
} from "react-icons/fa";

import api from "../../api/axios";
import "./Reports.css";

function Reports() {
  // ============================================================
  // STATE
  // ============================================================

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // EXTRACT API DATA
  // ============================================================

  const extractData = (response) => {
    const body = response?.data;

    // ApiResponse -> data
    if (Array.isArray(body?.data)) {
      return body.data;
    }

    // Spring Page -> content
    if (Array.isArray(body?.content)) {
      return body.content;
    }

    // Direct array
    if (Array.isArray(body)) {
      return body;
    }

    return [];
  };

  // ============================================================
  // FETCH DATABASE DATA
  // ============================================================

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      setError("");

      const [ordersResponse, productsResponse, customersResponse] =
        await Promise.all([
          api.get("/orders", {
            params: {
              page: 0,
              size: 1000,
              sort: "orderId,desc",
            },
          }),

          api.get("/product", {
            params: {
              page: 0,
              size: 1000,
              sort: "productId,desc",
            },
          }),

          api.get("/customer", {
            params: {
              page: 0,
              size: 1000,
              sort: "customerId,desc",
            },
          }),
        ]);

      const ordersData = extractData(ordersResponse);
      const productsData = extractData(productsResponse);
      const customersData = extractData(customersResponse);

      console.log("Reports Orders:", ordersData);
      console.log("Reports Products:", productsData);
      console.log("Reports Customers:", customersData);

      setOrders(ordersData);
      setProducts(productsData);
      setCustomers(customersData);
    } catch (err) {
      console.error("Reports data error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load report data from database.",
      );

      setOrders([]);
      setProducts([]);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchReportsData();
  }, []);

  // ============================================================
  // DATE FILTER
  // ============================================================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (!order.orderDate) {
        return false;
      }

      const orderDate = String(order.orderDate).substring(0, 10);

      if (startDate && orderDate < startDate) {
        return false;
      }

      if (endDate && orderDate > endDate) {
        return false;
      }

      return true;
    });
  }, [orders, startDate, endDate]);

  // ============================================================
  // BASIC REPORT CALCULATIONS
  // ============================================================

  const reportData = useMemo(() => {
    let revenue = 0;
    let totalItemsSold = 0;

    const customerMap = {};
    const productMap = {};
    const dailyMap = {};

    filteredOrders.forEach((order) => {
      const orderTotal = Number(order.totalAmount || 0);

      revenue += orderTotal;

      // --------------------------------------------------------
      // CUSTOMER SALES
      // --------------------------------------------------------

      const customerId = order.customerId;

      if (customerId) {
        if (!customerMap[customerId]) {
          customerMap[customerId] = {
            customerId,
            customerName: order.customerName || "Unknown Customer",
            orders: 0,
            revenue: 0,
          };
        }

        customerMap[customerId].orders += 1;
        customerMap[customerId].revenue += orderTotal;
      }

      // --------------------------------------------------------
      // DAILY SALES
      // --------------------------------------------------------

      if (order.orderDate) {
        const date = String(order.orderDate).substring(0, 10);

        if (!dailyMap[date]) {
          dailyMap[date] = {
            date,
            sales: 0,
            revenue: 0,
          };
        }

        dailyMap[date].sales += 1;
        dailyMap[date].revenue += orderTotal;
      }

      // --------------------------------------------------------
      // PRODUCTS / LENSES
      // --------------------------------------------------------

      if (Array.isArray(order.items)) {
        order.items.forEach((item) => {
          const quantity = Number(item.quantity || 0);
          const price = Number(item.price || 0);

          totalItemsSold += quantity;

          // Product / Frame
          if (item.productId) {
            const key = `product-${item.productId}`;

            if (!productMap[key]) {
              productMap[key] = {
                id: item.productId,
                type: "Product",
                name: item.productName || "Unknown Product",
                quantity: 0,
                revenue: 0,
              };
            }

            productMap[key].quantity += quantity;
            productMap[key].revenue += quantity * price;
          }

          // Lens
          if (item.lensId) {
            const key = `lens-${item.lensId}`;

            if (!productMap[key]) {
              productMap[key] = {
                id: item.lensId,
                type: "Lens",
                name: item.lensBrand || "Unknown Lens",
                quantity: 0,
                revenue: 0,
              };
            }

            productMap[key].quantity += quantity;
            productMap[key].revenue += quantity * price;
          }
        });
      }
    });

    // ----------------------------------------------------------
    // TOP CUSTOMERS
    // ----------------------------------------------------------

    const topCustomers = Object.values(customerMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // ----------------------------------------------------------
    // TOP PRODUCTS
    // ----------------------------------------------------------

    const topProducts = Object.values(productMap)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    // ----------------------------------------------------------
    // DAILY DATA
    // ----------------------------------------------------------

    const dailySales = Object.values(dailyMap).sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    return {
      revenue,
      totalOrders: filteredOrders.length,
      totalItemsSold,
      topCustomers,
      topProducts,
      dailySales,
    };
  }, [filteredOrders]);

  // ============================================================
  // CLEAR FILTERS
  // ============================================================

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  // ============================================================
  // DATE CHANGE
  // ============================================================

  const handleStartDateChange = (e) => {
    const value = e.target.value;

    setStartDate(value);

    if (endDate && value > endDate) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;

    if (startDate && value < startDate) {
      return;
    }

    setEndDate(value);
  };

  // ============================================================
  // FORMAT CURRENCY
  // ============================================================

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });
  };

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN");
  };

  // ============================================================
  // AVERAGE ORDER VALUE
  // ============================================================

  const averageOrderValue =
    reportData.totalOrders > 0
      ? reportData.revenue / reportData.totalOrders
      : 0;

  // ============================================================
  // MAX CHART VALUE
  // ============================================================

  const maxRevenue = Math.max(
    ...reportData.dailySales.map((item) => item.revenue),
    1,
  );

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="reports-page">
        <div className="reports-loading">
          <FaSyncAlt className="reports-loading-icon" />
          <h3>Loading Reports...</h3>
          <p>Calculating reports from your database.</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="reports-page">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="reports-header">
        <div className="reports-title">
          <h2>Reports & Analytics</h2>

          <p>Business performance calculated from your Lensify database.</p>
        </div>

        <div className="report-filter">
          <div className="date-field">
            <label htmlFor="startDate">From</label>

            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              max={endDate || undefined}
            />
          </div>

          <div className="date-field">
            <label htmlFor="endDate">To</label>

            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate || undefined}
            />
          </div>

          {(startDate || endDate) && (
            <button
              type="button"
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              Clear
            </button>
          )}

          <button
            type="button"
            className="refresh-report-btn"
            onClick={fetchReportsData}
            title="Refresh report data"
          >
            <FaSyncAlt />
          </button>
        </div>
      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="reports-error">
          <strong>Unable to load report data</strong>
          <p>{error}</p>

          <button type="button" onClick={fetchReportsData}>
            Retry
          </button>
        </div>
      )}

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="report-summary-grid">
        <div className="report-summary-card">
          <div className="report-card-icon revenue">
            <FaRupeeSign />
          </div>

          <div>
            <span>Total Revenue</span>
            <strong>{formatCurrency(reportData.revenue)}</strong>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-card-icon orders">
            <FaShoppingCart />
          </div>

          <div>
            <span>Total Orders</span>
            <strong>{reportData.totalOrders}</strong>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-card-icon customers">
            <FaUsers />
          </div>

          <div>
            <span>Customers</span>
            <strong>{customers.length}</strong>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-card-icon products">
            <FaBoxOpen />
          </div>

          <div>
            <span>Items Sold</span>
            <strong>{reportData.totalItemsSold}</strong>
          </div>
        </div>
      </div>

      {/* ======================================================
          AVERAGE ORDER
      ====================================================== */}

      <div className="report-average-card">
        <div>
          <span>Average Order Value</span>

          <strong>{formatCurrency(averageOrderValue)}</strong>
        </div>

        <div className="average-description">
          Based on {reportData.totalOrders} order
          {reportData.totalOrders !== 1 ? "s" : ""} in the selected period.
        </div>
      </div>

      {/* ======================================================
          REVENUE CHART
      ====================================================== */}

      <div className="report-section-card">
        <div className="report-section-header">
          <div>
            <h3>
              <FaChartLine />
              Revenue Trend
            </h3>

            <p>Revenue calculated from orders stored in the database.</p>
          </div>
        </div>

        {reportData.dailySales.length === 0 ? (
          <div className="report-empty">
            No sales data available for the selected period.
          </div>
        ) : (
          <div className="revenue-chart">
            {reportData.dailySales.map((item) => {
              const height = Math.max((item.revenue / maxRevenue) * 100, 4);

              return (
                <div className="revenue-bar-wrapper" key={item.date}>
                  <div className="revenue-bar-value">
                    {formatCurrency(item.revenue)}
                  </div>

                  <div className="revenue-bar-container">
                    <div
                      className="revenue-bar"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>

                  <span>{formatDate(item.date)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ======================================================
          TOP CUSTOMERS + PRODUCTS
      ====================================================== */}

      <div className="report-two-column">
        {/* TOP CUSTOMERS */}

        <div className="report-section-card">
          <div className="report-section-header">
            <div>
              <h3>
                <FaUsers />
                Top Customers
              </h3>

              <p>Customers with the highest order revenue.</p>
            </div>
          </div>

          {reportData.topCustomers.length === 0 ? (
            <div className="report-empty">No customer sales found.</div>
          ) : (
            <div className="report-table-wrapper">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                  </tr>
                </thead>

                <tbody>
                  {reportData.topCustomers.map((customer) => (
                    <tr key={customer.customerId}>
                      <td>
                        <strong>{customer.customerName}</strong>
                      </td>

                      <td>{customer.orders}</td>

                      <td>{formatCurrency(customer.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* TOP PRODUCTS */}

        <div className="report-section-card">
          <div className="report-section-header">
            <div>
              <h3>
                <FaBoxOpen />
                Top Selling Items
              </h3>

              <p>Products and lenses sold most frequently.</p>
            </div>
          </div>

          {reportData.topProducts.length === 0 ? (
            <div className="report-empty">No item sales found.</div>
          ) : (
            <div className="report-table-wrapper">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Type</th>
                    <th>Qty</th>
                    <th>Revenue</th>
                  </tr>
                </thead>

                <tbody>
                  {reportData.topProducts.map((item) => (
                    <tr key={`${item.type}-${item.id}`}>
                      <td>
                        <strong>{item.name}</strong>
                      </td>

                      <td>
                        <span className="report-type-badge">{item.type}</span>
                      </td>

                      <td>{item.quantity}</td>

                      <td>{formatCurrency(item.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================
          RECENT TRANSACTIONS
      ====================================================== */}

      <div className="report-section-card">
        <div className="report-section-header">
          <div>
            <h3>
              <FaShoppingCart />
              Recent Transactions
            </h3>

            <p>Latest orders from the database.</p>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="report-empty">
            No transactions found for the selected period.
          </div>
        ) : (
          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {[...filteredOrders]
                  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                  .slice(0, 10)
                  .map((order) => (
                    <tr key={order.orderId}>
                      <td>
                        <strong>#{order.orderId}</strong>
                      </td>

                      <td>
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString(
                              "en-IN",
                            )
                          : "-"}
                      </td>

                      <td>{order.customerName || "Walk-in Customer"}</td>

                      <td>
                        <span
                          className={`report-status-badge ${String(
                            order.status || "UNKNOWN",
                          ).toLowerCase()}`}
                        >
                          {order.status || "UNKNOWN"}
                        </span>
                      </td>

                      <td>
                        <strong>{formatCurrency(order.totalAmount)}</strong>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ======================================================
          DATABASE INFORMATION
      ====================================================== */}

      <div className="reports-data-info">
        <div>
          <strong>Report Source</strong>

          <span>Live Lensify MySQL database</span>
        </div>

        <div>
          <strong>Orders Loaded</strong>

          <span>{orders.length}</span>
        </div>

        <div>
          <strong>Products Loaded</strong>

          <span>{products.length}</span>
        </div>

        <div>
          <strong>Customers Loaded</strong>

          <span>{customers.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Reports;
