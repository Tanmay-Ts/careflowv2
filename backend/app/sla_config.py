# app/sla_config.py

from typing import List
from app.models import Rule


# Operational SLA rules (non-clinical)
RULES: List[Rule] = [
    Rule(
        start_event="LAB_COMPLETED",
        end_event="LAB_REVIEWED",
        threshold_hours=2,
        department="Radiology",
    ),
    Rule(
        start_event="ADMISSION_APPROVED",
        end_event="BED_ASSIGNED",
        threshold_hours=3,
        department="Bed Management",
    ),
    Rule(
        start_event="DISCHARGE_APPROVED",
        end_event="PATIENT_DISCHARGED",
        threshold_hours=2,
        department="Billing",
    ),
]