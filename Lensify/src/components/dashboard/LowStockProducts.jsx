import {
  FaExclamationTriangle,
} from "react-icons/fa";

import "./dashboard.css";

function LowStockProducts() {

  const products = [

    {
      name: "RayBan Frame",
      stock: 2,
    },

    {
      name: "Blue Cut Lens",
      stock: 5,
    },

    {
      name: "Cleaning Kit",
      stock: 1,
    },

  ];

  return (

    <div className="info-card">

      <div className="card-header">

        <h3>

          <FaExclamationTriangle />

          Low Stock Products

        </h3>

      </div>

      <div className="card-body">

        {

          products.map((item, index) => (

            <div
              className="list-item"
              key={index}
            >

              <h4>

                {item.name}

              </h4>

              <span className="stock-badge">

                {item.stock} Left

              </span>

            </div>

          ))

        }

      </div>

    </div>

  );
}

export default LowStockProducts;