export default function DelayQueue({ delays, selectedDelay, onSelect }) {
  return (
    <div className="queue">
      <h2>Active Delays</h2>

      {delays.map((d, i) => (
        <div
          key={i}
          className={`queue-item ${
            selectedDelay === d ? "selected" : ""
          }`}
          onClick={() => onSelect(d)}
        >
          <strong>{d.department}</strong>
          <div>{d.rule_name}</div>
          <small>{d.delay_hours} hrs · {d.status}</small>
        </div>
      ))}
    </div>
  );
}