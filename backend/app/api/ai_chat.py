from fastapi import APIRouter
from pydantic import BaseModel
from ..services.gemini_service import gemini_service

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    context: str = ""
    level: str = "intermediate"

class ExplainRequest(BaseModel):
    concept: str
    level: str = "intermediate"

@router.post("/chat")
async def ai_chat(request: ChatRequest):
    """General AI chat for study help"""
    
    # For now, use the explain_concept method
    response = await gemini_service.explain_concept(request.message, request.level)
    
    return {
        "response": response,
        "context": request.context
    }

@router.post("/explain")
async def explain_concept(request: ExplainRequest):
    """Explain a concept at different levels"""
    
    explanation = await gemini_service.explain_concept(request.concept, request.level)
    
    return {
        "concept": request.concept,
        "level": request.level,
        "explanation": explanation
    }

@router.get("/motivate")
async def get_motivation():
    """Get motivational message"""
    return {
        "message": "You're doing great! Keep up the excellent work! 🚀",
        "tip": "Take breaks every 25 minutes to stay focused."
    }