import {
  FaUserPlus,
  FaFileMedical,
  FaReceipt,
  FaBoxOpen,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Customer",
      icon: <FaUserPlus />,
      path: "/customers/add",
      color: "blue",
    },
    {
      title: "New Prescription",
      icon: <FaFileMedical />,
      path: "/prescriptions/add",
      color: "green",
    },
    {
      title: "Create Receipt",
      icon: <FaReceipt />,
      path: "/receipts/create",
      color: "orange",
    },
    {
      title: "Add Product",
      icon: <FaBoxOpen />,
      path: "/products/add",
      color: "purple",
    },
  ];

  return (
    <div className="quick-actions">

      <div className="section-header">
        <h2>Quick Actions</h2>
        <p>Frequently used shortcuts</p>
      </div>

      <div className="action-grid">

        {actions.map((action, index) => (

          <div
            key={index}
            className="action-card"
            onClick={() => navigate(action.path)}
          >

            <div className={`action-icon ${action.color}`}>
              {action.icon}
            </div>

            <h4>{action.title}</h4>

          </div>

        ))}

      </div>

    </div>
  );
}

export default QuickActions;