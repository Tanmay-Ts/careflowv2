# app/fhir_ingest.py

import requests
from datetime import datetime, timezone
from typing import List

from app.models import Event

FHIR_BASE = "https://hapi.fhir.org/baseR4"
TIMEOUT_SECONDS = 10


def fetch(resource: str) -> List[dict]:
    """
    Fetch FHIR resources safely from public HAPI FHIR server.
    """
    url = f"{FHIR_BASE}/{resource}"
    response = requests.get(url, timeout=TIMEOUT_SECONDS)
    response.raise_for_status()

    bundle = response.json()
    return bundle.get("entry", [])


def ingest_events() -> List[Event]:
    """
    Convert FHIR resources into CareFlow operational events.
    Only extracts workflow-safe, non-clinical metadata.
    """
    events: List[Event] = []

    # -----------------------------
    # Encounters → Admission signals
    # -----------------------------
    for entry in fetch("Encounter"):
        enc = entry.get("resource", {})
        subject = enc.get("subject", {})

        case_id = subject.get("reference", "UNKNOWN").split("/")[-1]

        period = enc.get("period", {})
        start = period.get("start")

        if not start:
            continue

        timestamp = datetime.fromisoformat(
            start.replace("Z", "+00:00")
        ).astimezone(timezone.utc)

        events.append(
            Event(
                case_id=case_id,
                event_type="ADMISSION_APPROVED",
                timestamp=timestamp,
                department="Emergency",
            )
        )

    # -----------------------------
    # Procedures → Lab completion
    # -----------------------------
    for entry in fetch("Procedure"):
        proc = entry.get("resource", {})
        subject = proc.get("subject", {})

        case_id = subject.get("reference", "UNKNOWN").split("/")[-1]

        performed = proc.get("performedDateTime")
        if not performed:
            continue

        timestamp = datetime.fromisoformat(
            performed.replace("Z", "+00:00")
        ).astimezone(timezone.utc)

        events.append(
            Event(
                case_id=case_id,
                event_type="LAB_COMPLETED",
                timestamp=timestamp,
                department="Laboratory",
            )
        )

    return events