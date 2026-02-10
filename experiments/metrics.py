def estimate_impact(delays):
    total_delay_hours = sum(d.delay_hours for d in delays)
    estimated_cost = total_delay_hours * 2000  # conservative per-hour cost proxy

    return {
        "delay_hours": round(total_delay_hours, 1),
        "estimated_cost": int(estimated_cost)
    }