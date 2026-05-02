import "./StatsCard.css";
const StatsCard = ({ title, value, change }) => {
  return (
    <div className="stats-card">
      <div className="stats-header">
        <span>{title}</span>
      </div>

      <h2>{value}</h2>

      <p className="change">{change}</p>
    </div>
  );
};

export default StatsCard;