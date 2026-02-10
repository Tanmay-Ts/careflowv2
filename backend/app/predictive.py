# app/predictive.py

def predict_impact(delay):
    hrs = delay.delay_hours

    if hrs < 2:
        return "Low immediate impact. Monitor for escalation."

    if hrs < 4:
        return (
            "Moderate operational risk. May delay downstream tasks "
            "and reduce staff throughput."
        )

    return (
        "High operational risk. Likely to cause bed blocking, "
        "longer patient wait times, and downstream congestion."
    )