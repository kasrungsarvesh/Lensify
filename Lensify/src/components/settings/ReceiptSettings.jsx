import { FaReceipt, FaSave } from "react-icons/fa";
import "./ReceiptSettings.css";

function ReceiptSettings() {
  return (
    <div className="settings-card">

      <div className="card-title">
        <FaReceipt />
        <h3>Receipt Settings</h3>
      </div>

      <form>

        <div className="settings-grid">

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

          <div className="full-width">
            <label>Footer Message</label>
            <textarea
              rows="3"
              defaultValue="Thank you for visiting Lensify Opticals."
            />
          </div>

          <div className="full-width">
            <label>Terms & Conditions</label>
            <textarea
              rows="4"
              defaultValue="Goods once sold will not be taken back."
            />
          </div>

          <div className="full-width">
            <label>Receipt Logo</label>
            <input type="file" />
          </div>

        </div>

        <div className="checkbox-section">

          <label>
            <input type="checkbox" defaultChecked />
            Print Shop Logo
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Print GST Number
          </label>

          <label>
            <input type="checkbox" />
            Print QR Code
          </label>

          <label>
            <input type="checkbox" />
            Auto Print After Save
          </label>

        </div>

        <div className="settings-btn">

          <button type="submit">

            <FaSave />

            Save Receipt Settings

          </button>

        </div>

      </form>

    </div>
  );
}

export default ReceiptSettings;