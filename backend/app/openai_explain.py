# app/openai_explain.py

import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def explain_delay(delay):
    prompt = f"""
You are a hospital operations analyst.

A care coordination delay has been detected.

Case ID: {delay.case_id}
Workflow: {delay.rule_name}
Delay Duration: {delay.delay_hours} hours
Department: {delay.department}
Severity: {delay.status}

Explain:
- What operational factors could cause this delay
- Why it matters for hospital flow
- What the operations team should check first

Do NOT mention AI, models, or predictions.
Do NOT reference clinical decisions.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=180,
    )

    return response.choices[0].message.content.strip()