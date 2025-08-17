from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
import os

from .api import auth, notes, documents, mindmaps, exams, ai_chat, community
from .core.config import settings
from .models.database import init_db

app = FastAPI(
    title="AfterNote API",
    description="Next-gen AI-powered study OS for students",
    version="1.0.0"
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    # Create upload directory
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    # Initialize database tables
    init_db()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(notes.router, prefix="/api/notes", tags=["notes"])
app.include_router(documents.router, prefix="/api/documents", tags=["documents"])
app.include_router(mindmaps.router, prefix="/api/mindmaps", tags=["mindmaps"])
app.include_router(exams.router, prefix="/api/exams", tags=["exams"])
app.include_router(ai_chat.router, prefix="/api/ai", tags=["ai"])
app.include_router(community.router, prefix="/api/community", tags=["community"])

@app.get("/")
async def root():
    return {"message": "Welcome to AfterNote - Your AI Study Companion! 🚀"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)