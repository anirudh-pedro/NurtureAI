"""Pydantic models for request/response validation."""

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    """Input schema for the /analyze endpoint."""
    text: str = Field(..., min_length=1, description="Natural language input from the user")


class HouseholdPlan(BaseModel):
    """Structured output schema for the household plan."""
    shopping_list: list = Field(default_factory=list, description="Items to buy")
    timeline: list = Field(default_factory=list, description="Scheduled actions with dates")
    recommendations: list = Field(default_factory=list, description="Contextual suggestions")
    uncertainty: str | None = Field(default=None, description="Notes on ambiguity or missing info")
