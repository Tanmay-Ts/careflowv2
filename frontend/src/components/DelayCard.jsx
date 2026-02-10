import { useState } from "react";
import { fetchImpact, analyzeCase } from "../api/careflow";

export default function DelayCard({ delay }) {
  const [impact, setImpact] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadImpact = async () => {
    const res = await fetchImpact(delay.case_id);
    setImpact(res.impact);
  };

  const analyze = async () => {
    setLoading(true);
    const res = await analyzeCase(delay.case_id);
    setAnalysis(res.analysis);
    setLoading(false);
  };

  return (
    <div
  className="card"
  onClick={() => alert("Clicked")}
  style={{ cursor: "pointer" }}
>

      <h3>⚠️ Case {delay.case_id}</h3>
      <p><b>Workflow:</b> {delay.rule_name}</p>
      <p><b>Delay:</b> {delay.delay_hours} hrs</p>
      <p><b>Status:</b> {delay.status}</p>

      <button onClick={loadImpact}>Show Impact</button>
      {impact && <p className="impact">{impact}</p>}

      <button onClick={analyze}>Analyze</button>
      {loading && <p>Analyzing…</p>}
      {analysis && <p className="analysis">{analysis}</p>}
    </div>
  );
}