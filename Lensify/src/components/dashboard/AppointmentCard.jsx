import {
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa";

import "./dashboard.css";

function AppointmentCard() {

  const appointments = [

    {
      time: "09:30 AM",
      customer: "Rahul Sharma",
      purpose: "Eye Test",
    },

    {
      time: "11:00 AM",
      customer: "Priya Patel",
      purpose: "Frame Selection",
    },

    {
      time: "03:30 PM",
      customer: "Amit Shah",
      purpose: "Lens Delivery",
    },

  ];

  return (

    <div className="info-card">

      <div className="card-header">

        <h3>

          <FaCalendarCheck />

          Today's Appointments

        </h3>

      </div>

      <div className="card-body">

        {

          appointments.map((item, index) => (

            <div
              className="list-item"
              key={index}
            >

              <div>

                <h4>{item.customer}</h4>

                <p>{item.purpose}</p>

              </div>

              <span>

                <FaClock />

                {item.time}

              </span>

            </div>

          ))

        }

      </div>

    </div>

  );
}

export default AppointmentCard;