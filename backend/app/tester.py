# tester.py
"""
CareFlow – OpenAI API Key Tester (Modern, Safe)

- Uses Responses API (current standard)
- Uses timeout (no hanging)
- Reads key from .env
"""

import os
from dotenv import load_dotenv
from openai import OpenAI


def main():
    print("\n=== CareFlow OpenAI Key Tester ===\n")

    print("🔍 Loading .env...")
    load_dotenv()

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ OPENAI_API_KEY not found in .env")
        return

    print("✅ OPENAI_API_KEY loaded")

    client = OpenAI(api_key=api_key)

    try:
        print("📡 Sending test request to OpenAI (timeout=10s)...")

        response = client.responses.create(
            model="gpt-4.1-mini",
            input="Reply with exactly: OK",
            timeout=10,
            max_output_tokens=16,
        )

        text = response.output_text.strip()

        if text == "OK":
            print("✅ OpenAI API working correctly")
        else:
            print("⚠️ OpenAI responded, but unexpected output:")
            print(text)

    except Exception as e:
        print("❌ OpenAI API test failed")
        print("Error:", e)

    print("\n=== Test Complete ===\n")


if __name__ == "__main__":
    main()