const API_BASE = "http://127.0.0.1:8000";

export async function fetchDelays() {
  const res = await fetch(`${API_BASE}/delays`);
  if (!res.ok) {
    throw new Error("Failed to fetch delays");
  }
  return res.json();
}

export async function acknowledgeCase(caseId) {
  await fetch(`${API_BASE}/cases/${caseId}/acknowledge`, {
    method: "POST",
  });
}

export async function escalateCase(caseId) {
  await fetch(`${API_BASE}/cases/${caseId}/escalate`, {
    method: "POST",
  });
}