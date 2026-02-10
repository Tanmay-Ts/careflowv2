def predict_consequence(delay):
    if delay.delay_hours > 4:
        return "If unresolved, ER congestion risk within ~40 minutes."
    if delay.delay_hours > 2:
        return "Likely downstream bed blocking within the next hour."
    return "Monitor — no immediate systemic impact."