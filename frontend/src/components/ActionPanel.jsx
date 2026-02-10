import { useState } from "react";

export default function ActionPanel({ delay }) {
  const [log, setLog] = useState([]);

  if (!delay) return null;

  function record(action) {
    setLog([
      ...log,
      `${new Date().toLocaleTimeString()} — ${action}`
    ]);
  }

  return (
    <div className="actions panel">
      <h3>Actions</h3>

      <button onClick={() => record("Acknowledged")}>
        Acknowledge
      </button>

      <button onClick={() => record("Escalated to Ops Lead")}>
        Escalate
      </button>

      <button onClick={() => record("Notification Sent")}>
        Notify Team
      </button>

      {log.length > 0 && (
        <>
          <h4>Audit Trail</h4>
          <ul>
            {log.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}