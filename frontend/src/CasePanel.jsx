import Timeline from "./Timeline";

export default function CasePanel({ delay }) {
  return (
    <div className="card" style={{ height: "100%" }}>
      {!delay && (
        <>
          <h3>Case Intelligence</h3>
          <p style={{ color: "#9aa0a6" }}>
            Select a case from the list to inspect delays and workflow impact.
          </p>
        </>
      )}

      {delay && (
        <>
          <h3>Case Intelligence</h3>

          <p><strong>Case:</strong> {delay.case_id}</p>
          <p><strong>Department:</strong> {delay.department}</p>
          <p><strong>Workflow:</strong> {delay.rule_name}</p>
          <p><strong>Delay:</strong> {delay.delay_hours.toFixed(1)} hrs</p>
          <p><strong>Status:</strong> {delay.status}</p>

          <Timeline delay={delay} />
        </>
      )}
    </div>
  );
}