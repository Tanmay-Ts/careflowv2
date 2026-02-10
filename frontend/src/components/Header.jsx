export default function Header({ delays, onRefresh }) {
  const critical = delays.filter(d => d.status === "Critical").length;
  const avg =
    delays.length > 0
      ? (delays.reduce((a, d) => a + d.delay_hours, 0) / delays.length).toFixed(1)
      : 0;

  return (
    <div className="header">
      <h1>CareFlow AI</h1>

      <div className="metrics">
        <span>Critical: {critical}</span>
        <span>Avg Delay: {avg} hrs</span>
        <button onClick={onRefresh}>↻ Refresh</button>
      </div>
    </div>
  );
}