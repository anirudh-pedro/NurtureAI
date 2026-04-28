"""Groq LLM integration service."""

import os
import logging

from groq import Groq

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are "Household Brain for Moms" — an AI assistant that helps mothers organize household tasks, baby care, and shopping.

Given a natural language message from a mom, extract and generate the following:

## Extraction Rules
- **baby_age**: Detect the baby's age if mentioned. Use it to contextualize all recommendations.
- **product_needs**: Identify any products mentioned or implied (diapers, formula, wipes, etc.).
- **events**: Detect upcoming events, milestones, or deadlines (doctor visits, birthdays, etc.).

## Generation Rules
- **shopping_list**: A list of items to buy. Each item should be a string like "Diapers (Size 3) — estimated 2-week supply". Be specific about sizes based on baby age.
- **timeline**: A list of actionable steps with approximate timing, e.g. "Buy diapers within 1-2 days", "Schedule 6-month checkup next month".
- **recommendations**: Practical, contextual advice. Consider baby developmental stage.

## Prediction Logic
- A baby uses approximately 6 diapers per day.
- "Running low" means roughly 3 days of supply left (~18 diapers).
- If a product is running low, calculate urgency and reflect it in the timeline.
- For formula, estimate ~25oz/day for a 5-month-old.

## Uncertainty Handling
- If the input is vague or missing critical info, set "uncertainty" to a brief explanation of what's unclear.
- If confident, set "uncertainty" to null.

## Output Format
Respond with STRICT JSON only. No markdown, no explanation, no text outside the JSON.
The JSON must have exactly these keys:
{
  "shopping_list": ["item1", "item2"],
  "timeline": ["step1", "step2"],
  "recommendations": ["rec1", "rec2"],
  "uncertainty": null or "explanation string"
}"""


def analyze_text(input_text: str) -> dict:
    """Call Groq LLM with the household analysis prompt and return raw response text.

    Args:
        input_text: Natural language input from the user.

    Returns:
        Raw content string from the LLM response.

    Raises:
        RuntimeError: If the API call fails.
    """
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY environment variable is not set")

    client = Groq(api_key=api_key)

    try:
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": input_text},
            ],
            temperature=0.2,
            max_tokens=1024,
        )
        raw_content = response.choices[0].message.content
        logger.info("LLM response received (%d chars)", len(raw_content))
        return raw_content

    except Exception as e:
        logger.error("Groq API call failed: %s", e)
        raise RuntimeError(f"LLM service error: {e}") from e
