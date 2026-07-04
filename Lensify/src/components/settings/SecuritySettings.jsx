import { FaLock, FaSave } from "react-icons/fa";
import "./SecuritySettings.css";

function SecuritySettings() {
  return (
    <div className="settings-card">

      <div className="card-title">
        <FaLock />
        <h3>Security Settings</h3>
      </div>

      <form>

        <div className="settings-grid">

          <div>
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
            />
          </div>

          <div>
            <label>Session Timeout (Minutes)</label>
            <input
              type="number"
              defaultValue="30"
            />
          </div>

        </div>

        <div className="checkbox-section">

          <label>
            <input type="checkbox" />
            Enable Two-Factor Authentication
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Enable Login Alerts
          </label>

          <label>
            <input type="checkbox" defaultChecked />
            Enable Email Notifications
          </label>

          <label>
            <input type="checkbox" />
            Logout After Inactivity
          </label>

          <label>
            <input type="checkbox" />
            Force Password Change Every 90 Days
          </label>

        </div>

        <div className="settings-btn">

          <button type="submit">

            <FaSave />

            Update Security Settings

          </button>

        </div>

      </form>

    </div>
  );
}

export default SecuritySettings;