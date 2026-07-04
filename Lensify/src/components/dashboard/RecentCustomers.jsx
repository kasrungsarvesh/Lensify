import { FaUser } from "react-icons/fa";
import "./dashboard.css";

function RecentCustomers() {

  const customers = [

    {
      name: "Rahul Sharma",
      mobile: "9876543210",
      city: "Mumbai",
    },

    {
      name: "Priya Patel",
      mobile: "9988776655",
      city: "Thane",
    },

    {
      name: "Amit Shah",
      mobile: "9822114455",
      city: "Borivali",
    },

  ];

  return (

    <div className="info-card">

      <div className="card-header">

        <h3>

          <FaUser />

          Recent Customers

        </h3>

      </div>

      <div className="card-body">

        {

          customers.map((customer, index) => (

            <div
              className="list-item"
              key={index}
            >

              <div>

                <h4>{customer.name}</h4>

                <p>

                  {customer.mobile}

                  {" • "}

                  {customer.city}

                </p>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default RecentCustomers;