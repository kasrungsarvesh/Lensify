import { FaReceipt } from "react-icons/fa";
import "./dashboard.css";

function RecentReceipts() {

  const receipts = [

    {
      no: "REC-1001",
      customer: "Rahul Sharma",
      amount: "₹2,500",
    },

    {
      no: "REC-1002",
      customer: "Priya Patel",
      amount: "₹1,800",
    },

    {
      no: "REC-1003",
      customer: "Amit Shah",
      amount: "₹3,200",
    },

  ];

  return (

    <div className="info-card">

      <div className="card-header">

        <h3>

          <FaReceipt />

          Recent Receipts

        </h3>

      </div>

      <div className="card-body">

        {

          receipts.map((receipt, index) => (

            <div
              className="list-item"
              key={index}
            >

              <div>

                <h4>{receipt.no}</h4>

                <p>{receipt.customer}</p>

              </div>

              <span>

                {receipt.amount}

              </span>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default RecentReceipts;