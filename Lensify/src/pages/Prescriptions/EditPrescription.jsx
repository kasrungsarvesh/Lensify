import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaSave, FaEdit } from "react-icons/fa";
import "./EditPrescription.css";

function EditPrescription() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    customerName: "Rahul Sharma",
    doctorName: "Dr. Shah",
    prescriptionDate: "2026-06-20",

    rightEyeSph: "-1.25",
    rightEyeCyl: "-0.50",
    rightEyeAxis: "180",
    rightEyeVa: "6/6",

    leftEyeSph: "-1.00",
    leftEyeCyl: "-0.25",
    leftEyeAxis: "170",
    leftEyeVa: "6/6",

    pdDistance: "62",
    pdNear: "60",

    lensType: "Progressive",
    lensIndex: "1.56",
    coating: "Blue Cut",

    remarks:
      "Customer prefers lightweight blue cut lenses.",
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

    alert("Prescription Updated Successfully");
  };

  return (
    <div className="edit-prescription-page">

      <div className="page-header">

        <div>
          <h2>Edit Prescription</h2>
          <p>
            Prescription ID : PRE00{id}
          </p>
        </div>

        <div className="header-icon">
          <FaEdit />
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        {/* Customer Info */}

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
                    name="rightEyeSph"
                    value={formData.rightEyeSph}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    name="rightEyeCyl"
                    value={formData.rightEyeCyl}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    name="rightEyeAxis"
                    value={formData.rightEyeAxis}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
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
                    name="leftEyeSph"
                    value={formData.leftEyeSph}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    name="leftEyeCyl"
                    value={formData.leftEyeCyl}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
                    name="leftEyeAxis"
                    value={formData.leftEyeAxis}
                    onChange={handleChange}
                  />
                </td>

                <td>
                  <input
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
                name="pdDistance"
                value={formData.pdDistance}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>PD Near</label>

              <input
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
                <option>Single Vision</option>
                <option>Progressive</option>
                <option>Bifocal</option>
              </select>
            </div>

            <div>
              <label>Lens Index</label>

              <select
                name="lensIndex"
                value={formData.lensIndex}
                onChange={handleChange}
              >
                <option>1.50</option>
                <option>1.56</option>
                <option>1.60</option>
              </select>
            </div>

            <div>
              <label>Coating</label>

              <select
                name="coating"
                value={formData.coating}
                onChange={handleChange}
              >
                <option>Blue Cut</option>
                <option>Anti Glare</option>
                <option>Hard Coat</option>
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
          className="update-btn"
        >
          <FaSave />
          Update Prescription
        </button>

      </form>

    </div>
  );
}

export default EditPrescription;