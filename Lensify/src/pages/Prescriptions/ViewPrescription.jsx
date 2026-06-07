import { FaPrint, FaEdit, FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./ViewPrescription.css";

function ViewPrescription() {
  const { id } = useParams();

  return (
    <div className="view-prescription-page">

      {/* Header */}

      <div className="view-header">

        <div>
          <h2>Prescription Details</h2>
          <p>Prescription ID : PRE00{id}</p>
        </div>

        <div className="header-actions">

          <button className="print-btn">
            <FaPrint />
            Print
          </button>

          <Link
            to={`/prescriptions/edit/${id}`}
            className="edit-btn-prescription"
          >
            <FaEdit />
            Edit
          </Link>

        </div>

      </div>

      {/* Customer Card */}

      <div className="view-card">

        <h3>Customer Information</h3>

        <div className="customer-grid">

          <div>
            <label>Customer Name</label>
            <p>Rahul Sharma</p>
          </div>

          <div>
            <label>Doctor Name</label>
            <p>Dr. Shah</p>
          </div>

          <div>
            <label>Prescription Date</label>
            <p>20-Jun-2026</p>
          </div>

        </div>

      </div>

      {/* Eye Power */}

      <div className="view-card">

        <h3>Eye Power Details</h3>

        <table className="eye-table">

          <thead>
            <tr>
              <th>Eye</th>
              <th>SPH</th>
              <th>CYL</th>
              <th>AXIS</th>
              <th>VA</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Right Eye</td>
              <td>-1.25</td>
              <td>-0.50</td>
              <td>180</td>
              <td>6/6</td>
            </tr>

            <tr>
              <td>Left Eye</td>
              <td>-1.00</td>
              <td>-0.25</td>
              <td>170</td>
              <td>6/6</td>
            </tr>

          </tbody>

        </table>

      </div>

      {/* Lens Details */}

      <div className="view-card">

        <h3>Lens Information</h3>

        <div className="lens-grid">

          <div>
            <label>PD Distance</label>
            <p>62</p>
          </div>

          <div>
            <label>PD Near</label>
            <p>60</p>
          </div>

          <div>
            <label>Lens Type</label>
            <p>Progressive</p>
          </div>

          <div>
            <label>Lens Index</label>
            <p>1.56</p>
          </div>

          <div>
            <label>Coating</label>
            <p>Blue Cut</p>
          </div>

        </div>

      </div>

      {/* Remarks */}

      <div className="view-card">

        <h3>Remarks</h3>

        <p className="remarks">
          Customer prefers lightweight blue cut lenses.
          Recommended anti-glare coating.
        </p>

      </div>

      <Link
        to="/prescriptions"
        className="back-btn"
      >
        <FaArrowLeft />
        Back To Prescriptions
      </Link>

    </div>
  );
}

export default ViewPrescription;