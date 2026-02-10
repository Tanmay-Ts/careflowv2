# app/listener.py

from app.fhir_ingest import ingest_events


class OperationalListener:
    """
    Read-only operational listener.
    In production, this would poll or subscribe to FHIR / audit logs.
    """

    def poll(self):
        """
        Fetch latest operational events from FHIR ingestion layer.
        Returns a flat list of Event objects.
        """
        events = ingest_events()
        return events