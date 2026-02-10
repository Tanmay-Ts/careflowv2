import React, { useEffect, useState } from "react";
import { fetchDelays } from "./api";

export default function App() {
  const [delays, setDelays] = useState([]);
  const [selectedDelay, setSelectedDelay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDelays()
      .then((data) => {
        setDelays(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading CareFlow data…</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={{ padding: "24px", fontFamily: "Arial" }}>
      <h1>CareFlow AI</h1>
      <p>Live hospital operational intelligence</p>

      <h2>Active Delays ({delays.length})</h2>
      {selectedDelay && (
  <div style={{ marginBottom: "12px", color: "green" }}>
    Selected case: {selectedDelay.case_id}
  </div>
)}

      {delays.map((d, idx) => (
        <div
          key={idx}
          onClick={() => {
            console.log("Clicked:", d);
            setSelectedDelay(d);
          }}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "12px",
            cursor: "pointer",
            background:
                selectedDelay?.case_id === d.case_id ? "#e6f0ff" : "#fafafa"
          }}
        >
          <strong>Case:</strong> {d.case_id} <br />
          <strong>Department:</strong> {d.department} <br />
          <strong>Workflow:</strong> {d.rule_name} <br />
          <strong>Delay:</strong> {d.delay_hours} hrs <br />
          <strong>Status:</strong> {d.status}
        </div>
      ))}

      {selectedDelay && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            border: "2px solid black",
          }}
        >
          <h3>Selected Case Details</h3>
          <p><strong>Case:</strong> {selectedDelay.case_id}</p>
          <p><strong>Department:</strong> {selectedDelay.department}</p>
          <p><strong>Workflow:</strong> {selectedDelay.rule_name}</p>
          <p><strong>Delay:</strong> {selectedDelay.delay_hours} hrs</p>
          <p><strong>Status:</strong> {selectedDelay.status}</p>
        </div>
      )}
    </div>
  );
}