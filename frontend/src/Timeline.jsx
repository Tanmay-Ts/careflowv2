export default function Timeline({ delay }) {
  if (!delay || !delay.rule_name) {
    return null;
  }

  const parts = delay.rule_name.split("->");

  return (
    <div className="analysis">
      <h4>Workflow Timeline</h4>

      <p><strong>Start:</strong> {parts[0]?.trim() || "Unknown"}</p>
      <p><strong>Expected Next:</strong> {parts[1]?.trim() || "Unknown"}</p>

      <p style={{ marginTop: "8px" }}>
        SLA breached by <strong>{delay.delay_hours.toFixed(1)} hours</strong>
      </p>
    </div>
  );
}