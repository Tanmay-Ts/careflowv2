const API = "http://127.0.0.1:8000";

export const fetchDelays = async () => {
  const res = await fetch(`${API}/delays`);
  return res.json();
};

export const fetchImpact = async (caseId) => {
  const res = await fetch(`${API}/impact/${caseId}`);
  return res.json();
};

export const analyzeCase = async (caseId) => {
  const res = await fetch(`${API}/analyze/${caseId}`, {
    method: "POST",
  });
  return res.json();
};