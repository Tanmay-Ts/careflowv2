import { useEffect, useState } from "react";
import { fetchDelays } from "./api";
import CasePanel from "./CasePanel";

export default function App() {
  const [delays, setDelays] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // -----------------------------
  // Fetch delays
  // -----------------------------
  useEffect(() => {
    let alive = true;

    fetchDelays()
      .then((data) => {
        if (alive) {
          setDelays(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (alive) {
          setError(err.message || "Failed to load delays");
          setLoading(false);
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  const selectedDelay =
    delays.find((d) => d.case_id === selectedCaseId) || null;

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="container">
      {/* HEADER */}
      <header>
        <h1>CareFlow AI</h1>
        <p>Live hospital operational intelligence</p>
      </header>

      {/* METRICS */}
      <div className="metrics">
        <div className="card">
          <strong>{delays.length}</strong>
          <div>Active Delays</div>
        </div>

        <div className="card">
          <strong>
            {delays.length
              ? Math.round(
                  delays.reduce((a, d) => a + d.delay_hours, 0) /
                    delays.length
                )
              : 0}
          </strong>
          <div>Avg Delay (hrs)</div>
        </div>

        <div className="card">
          <strong>LIVE</strong>
          <div>Status</div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "16px",
        }}
      >
        {/* CASE LIST */}
        <div className="table">
          <div className="row header">
            <div>Case</div>
            <div>Department</div>
            <div>Workflow</div>
            <div>Delay</div>
            <div>Status</div>
          </div>

          {loading && <div className="row">Loading cases…</div>}
          {error && <div className="row">{error}</div>}

          {!loading && !error && delays.length === 0 && (
            <div className="row">No active delays</div>
          )}

          {!loading &&
            !error &&
            delays.map((d) => (
              <div
                key={d.case_id}
                className="row"
                onClick={() => setSelectedCaseId(d.case_id)}
                style={{
                  cursor: "pointer",
                  background:
                    selectedCaseId === d.case_id
                      ? "#1f2937"
                      : "transparent",
                }}
              >
                <div>{d.case_id}</div>
                <div>{d.department}</div>
                <div>{d.rule_name}</div>
                <div>{d.delay_hours.toFixed(1)}h</div>
                <div>
                  <span className={`badge ${d.status.toLowerCase()}`}>
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* SIDE PANEL */}
        <CasePanel delay={selectedDelay} />
      </div>
    </div>
  );
}