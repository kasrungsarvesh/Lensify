import { FaSave, FaStore } from "react-icons/fa";
import "./ShopSettings.css";

function ShopSettings() {
  return (
    <div className="settings-card">

      <div className="card-title">

        <FaStore />

        <h3>Shop Information</h3>

      </div>

      <form>

        <div className="settings-grid">

          <div>

            <label>Shop Name</label>

            <input
              type="text"
              defaultValue="Lensify Opticals"
            />

          </div>

          <div>

            <label>Owner Name</label>

            <input
              type="text"
              defaultValue="Sarvesh Kasrung"
            />

          </div>

          <div>

            <label>Email</label>

            <input
              type="email"
              defaultValue="lensify@gmail.com"
            />

          </div>

          <div>

            <label>Phone</label>

            <input
              type="text"
              defaultValue="9876543210"
            />

          </div>

          <div>

            <label>GST Number</label>

            <input
              type="text"
              placeholder="27ABCDE1234F1Z5"
            />

          </div>

          <div>

            <label>City</label>

            <input
              type="text"
              placeholder="Mumbai"
            />

          </div>

          <div>

            <label>State</label>

            <input
              type="text"
              placeholder="Maharashtra"
            />

          </div>

          <div>

            <label>Pincode</label>

            <input
              type="text"
              placeholder="400067"
            />

          </div>

          <div className="full-width">

            <label>Address</label>

            <textarea
              rows="4"
              placeholder="Enter shop address"
            ></textarea>

          </div>

          <div className="full-width">

            <label>Shop Logo</label>

            <input type="file" />

          </div>

        </div>

        <div className="settings-btn">

          <button>

            <FaSave />

            Save Settings

          </button>

        </div>

      </form>

    </div>
  );
}

export default ShopSettings;