import { FaSave, FaMoneyBillWave } from "react-icons/fa";
import "./BillingSettings.css";

function BillingSettings() {
  return (
    <div className="settings-card">

      <div className="card-title">
        <FaMoneyBillWave />
        <h3>Billing Settings</h3>
      </div>

      <form>

        <div className="settings-grid">

          <div>
            <label>Currency</label>

            <select>
              <option>Indian Rupee (₹)</option>
              <option>US Dollar ($)</option>
              <option>Euro (€)</option>
            </select>
          </div>

          <div>
            <label>GST (%)</label>

            <input
              type="number"
              placeholder="18"
            />
          </div>

          <div>
            <label>Default Discount (%)</label>

            <input
              type="number"
              placeholder="0"
            />
          </div>

          <div>
            <label>Receipt Prefix</label>

            <input
              type="text"
              defaultValue="REC"
            />
          </div>

          <div>
            <label>Invoice Prefix</label>

            <input
              type="text"
              defaultValue="INV"
            />
          </div>

          <div>
            <label>Next Receipt No.</label>

            <input
              type="number"
              defaultValue="1001"
            />
          </div>

          <div>
            <label>Default Payment Mode</label>

            <select>
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Net Banking</option>
            </select>
          </div>

          <div>
            <label>Payment Due Days</label>

            <input
              type="number"
              defaultValue="0"
            />
          </div>

        </div>

        <div className="checkbox-section">

          <label>
            <input type="checkbox" defaultChecked />
            Enable GST
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Auto Generate Receipt Number
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Allow Discount
          </label>

          <label>
            <input type="checkbox" />
            Allow Partial Payment
          </label>

        </div>

        <div className="settings-btn">

          <button type="submit">

            <FaSave />

            Save Billing Settings

          </button>

        </div>

      </form>

    </div>
  );
}

export default BillingSettings;