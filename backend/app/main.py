from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.listener import OperationalListener
from app.engine import CareFlowEngine
from app.sla_config import RULES
from app.openai_explain import explain_delay

app = FastAPI(
    title="CareFlow AI",
    description="Hospital operational intelligence backend",
    version="1.0.0",
)

# CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # OK for hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

listener = OperationalListener()
engine = CareFlowEngine(RULES)


@app.get("/")
def root():
    return {
        "status": "CareFlow backend running",
        "message": "Hospital operational intelligence engine is live",
    }


@app.get("/delays")
def get_delays():
    events = listener.poll()
    delays = engine.detect(events)

    return [
        {
            "case_id": d.case_id,
            "workflow": d.rule_name,
            "department": d.department,
            "delay_hours": d.delay_hours,
            "status": d.status,
        }
        for d in delays
    ]


@app.post("/analyze/{case_id}")
def analyze_case(case_id: str):
    events = listener.poll()
    delays = engine.detect(events)

    delay = next((d for d in delays if d.case_id == case_id), None)

    if not delay:
        return {"error": "No active delay found"}

    explanation = explain_delay(delay)
    return {"analysis": explanation}
@app.get("/health")
def health():
    return {
        "status": "CareFlow backend running",
        "message": "Hospital operational intelligence engine is live"
    }
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)