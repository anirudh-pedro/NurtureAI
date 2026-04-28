"""Household Brain for Moms — FastAPI application entry point."""

import logging
from dotenv import load_dotenv

load_dotenv()  # Load .env before any module reads os.environ

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

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
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Ensure CORS headers on ALL error responses ---
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled exception: %s", exc)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


@app.post("/analyze", response_model=HouseholdPlan)
async def analyze(request: AnalyzeRequest):
    """Analyze natural language input and return a structured household plan."""
    logger.info("Received input: %s", request.text[:100])

    try:
        raw_response = analyze_text(request.text)
    except Exception as e:
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

