"""Household Brain for Moms — FastAPI application entry point."""

import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models.schema import AnalyzeRequest, HouseholdPlan
from services.llm_service import analyze_text
from utils.validator import parse_llm_response, FALLBACK_RESPONSE

# --- Logging ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

# --- App ---
app = FastAPI(
    title="Household Brain for Moms",
    description="AI-powered household planning assistant for mothers",
    version="1.0.0",
)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze", response_model=HouseholdPlan)
async def analyze(request: AnalyzeRequest):
    """Analyze natural language input and return a structured household plan."""
    logger.info("Received input: %s", request.text[:100])

    try:
        raw_response = analyze_text(request.text)
    except RuntimeError as e:
        logger.error("LLM service failed: %s", e)
        raise HTTPException(status_code=503, detail=str(e))

    plan = parse_llm_response(raw_response)

    # If we got the fallback, log it but still return 200
    if plan == FALLBACK_RESPONSE:
        logger.warning("Returned fallback response for input: %s", request.text[:100])

    return plan


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok"}
