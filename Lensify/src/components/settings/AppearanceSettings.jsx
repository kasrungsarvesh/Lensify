import { FaPalette, FaSave } from "react-icons/fa";
import "./AppearanceSettings.css";

function AppearanceSettings() {
  return (
    <div className="settings-card">

      <div className="card-title">
        <FaPalette />
        <h3>Appearance Settings</h3>
      </div>

      <form>

        <div className="settings-grid">

          {/* Theme */}

          <div className="full-width">

            <label>Theme</label>

            <div className="radio-group">

              <label>
                <input
                  type="radio"
                  name="theme"
                  defaultChecked
                />
                Light
              </label>

              <label>
                <input
                  type="radio"
                  name="theme"
                />
                Dark
              </label>

            </div>

          </div>

          {/* Primary Color */}

          <div className="full-width">

            <label>Primary Color</label>

            <div className="color-picker">

              <span className="color blue"></span>

              <span className="color green"></span>

              <span className="color purple"></span>

              <span className="color orange"></span>

            </div>

          </div>

          {/* Sidebar */}

          <div>

            <label>Sidebar Style</label>

            <select>

              <option>Expanded</option>

              <option>Collapsed</option>

            </select>

          </div>

          {/* Density */}

          <div>

            <label>Dashboard Density</label>

            <select>

              <option>Comfortable</option>

              <option>Compact</option>

            </select>

          </div>

          {/* Font */}

          <div>

            <label>Font Size</label>

            <select>

              <option>Small</option>

              <option selected>Medium</option>

              <option>Large</option>

            </select>

          </div>

          {/* Language */}

          <div>

            <label>Language</label>

            <select>

              <option>English</option>

              <option>Hindi</option>

            </select>

          </div>

        </div>

        <div className="settings-btn">

          <button>

            <FaSave />

            Save Appearance

          </button>

        </div>

      </form>

    </div>
  );
}

export default AppearanceSettings;