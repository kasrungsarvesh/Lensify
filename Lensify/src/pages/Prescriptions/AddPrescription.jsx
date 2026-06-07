import { useState } from "react";
import { FaSave, FaEye } from "react-icons/fa";
import "./AddPrescription.css";

function AddPrescription() {
  const [formData, setFormData] = useState({
    customerName: "",
    doctorName: "",
    prescriptionDate: "",

    rightEyeSph: "",
    rightEyeCyl: "",
    rightEyeAxis: "",
    rightEyeVa: "",

    leftEyeSph: "",
    leftEyeCyl: "",
    leftEyeAxis: "",
    leftEyeVa: "",

    pdDistance: "",
    pdNear: "",

    lensType: "",
    lensIndex: "",
    coating: "",

    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Prescription Saved Successfully");
  };

  return (
    <div className="prescription-container">

      <div className="page-header">

        <div>
          <h2>Add Prescription</h2>
          <p>Manage customer eye power details</p>
        </div>

        <div className="header-icon">
          <FaEye />
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        {/* Customer Information */}

        <div className="card">

          <h3>Customer Information</h3>

          <div className="grid-3">

            <div>
              <label>Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Prescription Date</label>
              <input
                type="date"
                name="prescriptionDate"
                value={formData.prescriptionDate}
                onChange={handleChange}
              />
            </div>

          </div>

        </div>

        {/* Eye Power */}

        <div className="card">

          <h3>Eye Power Details</h3>

          <table className="power-table">

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

                <td>
                  <input
                    type="text"
                    name="rightEyeSph"
                    value={formData.rightEyeSph}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="rightEyeCyl"
                    value={formData.rightEyeCyl}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="rightEyeAxis"
                    value={formData.rightEyeAxis}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="rightEyeVa"
                    value={formData.rightEyeVa}
                    onChange={handleChange}
                  />
                </td>

              </tr>

              <tr>

                <td>Left Eye</td>

                <td>
                  <input
                    type="text"
                    name="leftEyeSph"
                    value={formData.leftEyeSph}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="leftEyeCyl"
                    value={formData.leftEyeCyl}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="leftEyeAxis"
                    value={formData.leftEyeAxis}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="leftEyeVa"
                    value={formData.leftEyeVa}
                    onChange={handleChange}
                  />
                </td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* Lens Information */}

        <div className="card">

          <h3>Lens Information</h3>

          <div className="grid-2">

            <div>
              <label>PD Distance</label>
              <input
                type="number"
                name="pdDistance"
                value={formData.pdDistance}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>PD Near</label>
              <input
                type="number"
                name="pdNear"
                value={formData.pdNear}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Lens Type</label>
              <select
                name="lensType"
                value={formData.lensType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Single Vision</option>
                <option>Progressive</option>
                <option>Bifocal</option>
                <option>Blue Cut</option>
              </select>
            </div>

            <div>
              <label>Lens Index</label>
              <select
                name="lensIndex"
                value={formData.lensIndex}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>1.50</option>
                <option>1.56</option>
                <option>1.60</option>
                <option>1.67</option>
              </select>
            </div>

            <div>
              <label>Coating</label>
              <select
                name="coating"
                value={formData.coating}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Blue Cut</option>
                <option>Anti Glare</option>
                <option>Hard Coat</option>
                <option>UV Protection</option>
              </select>
            </div>

          </div>

        </div>

        {/* Remarks */}

        <div className="card">

          <h3>Remarks</h3>

          <textarea
            rows="5"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />

        </div>

        <button
          type="submit"
          className="save-prescription-btn"
        >
          <FaSave />
          Save Prescription
        </button>

      </form>

    </div>
  );
}

export default AddPrescription;