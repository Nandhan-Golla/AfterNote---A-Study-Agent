from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Dict, Any

from ..models.database import SessionLocal
from ..services.gemini_service import gemini_service

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class MindMapRequest(BaseModel):
    content: str
    title: str

@router.post("/generate")
async def generate_mindmap(request: MindMapRequest):
    """Generate mind map from content"""
    
    mindmap_data = await gemini_service.generate_mindmap_data(request.content)
    
    return {
        "title": request.title,
        "data": mindmap_data,
        "message": "Mind map generated successfully"
    }

@router.get("/")
async def get_mindmaps():
    """Get all mind maps"""
    return {"mindmaps": [], "message": "Mind maps endpoint"}

@router.post("/")
async def create_mindmap():
    """Create new mind map"""
    return {"message": "Create mind map endpoint"}