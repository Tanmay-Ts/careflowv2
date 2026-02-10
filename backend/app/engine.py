# app/engine.py

from datetime import datetime, timezone
from typing import List

from app.models import Delay, Event
from app.sla_config import Rule


class CareFlowEngine:
    """
    Core operational delay detection engine.
    Deterministic, auditable, and non-clinical.
    """

    def __init__(self, rules: List[Rule]):
        self.rules = rules

    def detect(self, events: List[Event]) -> List[Delay]:
        delays: List[Delay] = []

        # Always work in UTC
        now = datetime.now(timezone.utc)

        for e in events:
            event_time = e.timestamp

            # Safety: normalize timestamps
            if event_time.tzinfo is None:
                event_time = event_time.replace(tzinfo=timezone.utc)

            for rule in self.rules:
                if e.event_type == rule.start_event:
                    hrs = (now - event_time).total_seconds() / 3600

                    if hrs > rule.threshold_hours:
                        delays.append(
                            Delay(
                                case_id=e.case_id,
                                rule_name=f"{rule.start_event} → {rule.end_event}",
                                delay_hours=round(hrs, 2),
                                department=rule.department,
                                status=(
                                    "Critical"
                                    if hrs > rule.threshold_hours * 1.5
                                    else "Delayed"
                                ),
                            )
                        )

        return delays