import "./RecentTransactions.css";

const transactions = [
  {
    receipt: "REC-1001",
    customer: "Rahul Sharma",
    date: "04 Jul 2026",
    status: "Paid",
    amount: "₹2,500",
  },
  {
    receipt: "REC-1002",
    customer: "Priya Patel",
    date: "04 Jul 2026",
    status: "Pending",
    amount: "₹1,800",
  },
  {
    receipt: "REC-1003",
    customer: "Amit Shah",
    date: "03 Jul 2026",
    status: "Paid",
    amount: "₹3,200",
  },
  {
    receipt: "REC-1004",
    customer: "Neha Joshi",
    date: "02 Jul 2026",
    status: "Paid",
    amount: "₹5,100",
  },
];

function RecentTransactions() {
  return (
    <div className="transactions-card">

      <div className="transactions-header">

        <h3>Recent Transactions</h3>

      </div>

      <table className="transactions-table">

        <thead>

          <tr>

            <th>Receipt</th>

            <th>Customer</th>

            <th>Date</th>

            <th>Status</th>

            <th>Amount</th>

          </tr>

        </thead>

        <tbody>

          {transactions.map((item, index) => (

            <tr key={index}>

              <td>{item.receipt}</td>

              <td>{item.customer}</td>

              <td>{item.date}</td>

              <td>

                <span
                  className={
                    item.status === "Paid"
                      ? "payment paid"
                      : "payment pending"
                  }
                >
                  {item.status}
                </span>

              </td>

              <td className="amount">

                {item.amount}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentTransactions;