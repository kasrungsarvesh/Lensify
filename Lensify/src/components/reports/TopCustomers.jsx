import "./TopCustomers.css";

const customers = [
  {
    name: "Rahul Sharma",
    visits: 12,
    amount: "₹18,500",
  },
  {
    name: "Priya Patel",
    visits: 9,
    amount: "₹14,200",
  },
  {
    name: "Amit Shah",
    visits: 7,
    amount: "₹11,800",
  },
];

function TopCustomers() {
  return (
    <div className="report-widget">

      <div className="widget-header">
        <h3>Top Customers</h3>
      </div>

      {customers.map((customer, index) => (

        <div className="widget-item" key={index}>

          <div>

            <h4>{customer.name}</h4>

            <p>{customer.visits} Visits</p>

          </div>

          <span>{customer.amount}</span>

        </div>

      ))}

    </div>
  );
}

export default TopCustomers;