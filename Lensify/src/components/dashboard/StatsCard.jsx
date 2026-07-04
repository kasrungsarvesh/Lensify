import "./dashboard.css";

function StatsCard({
  title,
  value,
  change,
  icon,
  color,
}) {
  return (
    <div className="stats-card">

      <div className={`card-icon ${color}`}>

        {icon}

      </div>

      <div className="card-content">

        <h4>{title}</h4>

        <h2>{value}</h2>

        <span>{change}</span>

      </div>

    </div>
  );
}

export default StatsCard;