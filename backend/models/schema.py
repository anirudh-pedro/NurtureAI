"""Pydantic models for request/response validation."""

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    """Input schema for the /analyze endpoint."""
    text: str = Field(..., min_length=1, description="Natural language input from the user")


class ShoppingItem(BaseModel):
    item_name: str = Field(description="Name of the item")
    priority: str = Field(description="Priority: High, Medium, or Low")
    buy_in_days: int = Field(description="Number of days until the item is needed")
    reason: str = Field(description="Why the item is needed")

class TimelineEvent(BaseModel):
    event_name: str = Field(description="Name of the event or milestone")
    date: str = Field(description="Approximate date or timeframe")
    notes: str = Field(description="Context or details about the event")

class RecommendationItem(BaseModel):
    suggestion: str = Field(description="The recommendation")
    confidence: int = Field(description="Confidence percentage (0-100)")
    reasoning: str = Field(description="Why this was recommended")

class HouseholdPlan(BaseModel):
    """Structured output schema for the household plan."""
    shopping_list: list[ShoppingItem] = Field(default_factory=list, description="Items to buy")
    timeline: list[TimelineEvent] = Field(default_factory=list, description="Scheduled actions with dates")
    recommendations: list[RecommendationItem] = Field(default_factory=list, description="Contextual suggestions")
    uncertainty: str | None = Field(default=None, description="Notes on ambiguity or missing info")
