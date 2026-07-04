import "./dashboard.css";

function WelcomeBanner() {
  const today = new Date();

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return (
    <div className="welcome-banner">

      <div className="welcome-left">

        <h1>Welcome Back 👋</h1>

        <p>
          Manage your optical shop efficiently from one place.
        </p>

      </div>

      <div className="welcome-right">

        <h2>
          {today.toLocaleDateString("en-IN", options)}
        </h2>

      </div>

    </div>
  );
}

export default WelcomeBanner;