"""Validation utilities for LLM output parsing."""

import json
import logging

from models.schema import HouseholdPlan

logger = logging.getLogger(__name__)

FALLBACK_RESPONSE = HouseholdPlan(
    shopping_list=[],
    timeline=[],
    recommendations=[],
    uncertainty="Could not process input",
)


def parse_llm_response(raw_text: str) -> HouseholdPlan:
    """Parse and validate raw LLM output into a HouseholdPlan.

    Attempts JSON extraction, handles markdown code fences,
    and falls back gracefully on failure.
    """
    cleaned = raw_text.strip()

    # Strip markdown code fences if present
    if cleaned.startswith("```"):
        lines = cleaned.split("\n")
        # Remove first line (```json) and last line (```)
        lines = [l for l in lines[1:] if l.strip() != "```"]
        cleaned = "\n".join(lines)

    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError:
        logger.error("Failed to parse LLM output as JSON: %s", raw_text[:200])
        return FALLBACK_RESPONSE

    # Validate with Pydantic — missing fields get defaults
    try:
        return HouseholdPlan(**data)
    except Exception as e:
        logger.error("Pydantic validation failed: %s", e)
        return FALLBACK_RESPONSE
