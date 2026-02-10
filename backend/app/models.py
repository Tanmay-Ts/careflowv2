from dataclasses import dataclass
from datetime import datetime

@dataclass
class Event:
    case_id: str
    event_type: str
    timestamp: datetime
    department: str

@dataclass
class Rule:
    start_event: str
    end_event: str
    threshold_hours: float
    department: str

@dataclass
class Delay:
    case_id: str
    rule_name: str
    delay_hours: float
    department: str
    status: str