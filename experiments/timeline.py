def build_timeline(events, case_id):
    return sorted(
        [e for e in events if e.case_id == case_id],
        key=lambda x: x.timestamp
    )