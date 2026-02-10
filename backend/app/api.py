from fastapi import APIRouter
from app.listener import OperationalListener
from app.engine import CareFlowEngine
from app.sla_config import RULES
from app.openai_explain import explain_delay
from app.predictive import predict_impact

router = APIRouter()
listener = OperationalListener()
engine = CareFlowEngine(RULES)


@router.get("/events")
def get_events():
    return listener.poll()


@router.get("/delays")
def get_delays():
    events = listener.poll()
    delays = engine.detect(events)

    return [
        {
            "case_id": d.case_id,
            "rule": d.rule_name,
            "delay_hours": d.delay_hours,
            "department": d.department,
            "status": d.status,
            "prediction": predict_impact(d),
        }
        for d in delays
    ]


@router.post("/analyze/{case_id}")
def analyze_case(case_id: str):
    events = listener.poll()
    delays = engine.detect(events)

    for d in delays:
        if d.case_id == case_id:
            explanation = explain_delay(d)
            return {"analysis": explanation}

    return {"error": "Case not found"}
