from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
import os
import uuid
from datetime import datetime

from ..models.database import SessionLocal, Document
from ..services.gemini_service import gemini_service
from ..core.config import settings

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class DocumentResponse(BaseModel):
    id: str
    filename: str
    original_filename: str
    file_type: str
    file_size: int
    ai_summary: str
    ai_tags: List[str]
    ai_key_concepts: List[str]
    created_at: datetime

class ChatRequest(BaseModel):
    question: str

class ChatResponse(BaseModel):
    answer: str
    document_id: str

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    folder_id: str = None,
    db: Session = Depends(get_db)
):
    """Upload and process document with AI"""
    
    # Validate file type
    allowed_types = {
        'application/pdf': '.pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
        'application/vnd.ms-powerpoint': '.ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'text/plain': '.txt'
    }
    
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="File type not supported")
    
    # Generate unique filename
    file_id = str(uuid.uuid4())
    extension = allowed_types[file.content_type]
    filename = f"{file_id}{extension}"
    
    # Create upload directory if it doesn't exist
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(settings.UPLOAD_DIR, filename)
    
    # Save file
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    # Extract text content (placeholder - would use actual extraction libraries)
    extracted_text = await extract_text_from_file(file_path, file.content_type)
    
    # Create document record
    document = Document(
        filename=filename,
        original_filename=file.filename,
        file_path=file_path,
        file_type=file.content_type,
        file_size=len(content),
        owner_id=str(uuid.uuid4()),  # TODO: Get from auth
        folder_id=folder_id,
        extracted_text=extracted_text
    )
    
    # Generate AI enhancements
    if extracted_text:
        document.ai_summary = await gemini_service.generate_summary(extracted_text)
        document.ai_tags = await gemini_service.extract_key_concepts(extracted_text)
        document.ai_key_concepts = await gemini_service.extract_key_concepts(extracted_text)
    
    db.add(document)
    db.commit()
    db.refresh(document)
    
    return DocumentResponse(
        id=str(document.id),
        filename=document.filename,
        original_filename=document.original_filename,
        file_type=document.file_type,
        file_size=document.file_size,
        ai_summary=document.ai_summary or "",
        ai_tags=document.ai_tags or [],
        ai_key_concepts=document.ai_key_concepts or [],
        created_at=document.created_at
    )

@router.get("/", response_model=List[DocumentResponse])
async def get_documents(folder_id: str = None, db: Session = Depends(get_db)):
    """Get all documents, optionally filtered by folder"""
    
    # For demo purposes, return empty list since we don't have auth yet
    # query = db.query(Document).filter(Document.owner_id == "temp-user-id")
    documents = []
    
    # For demo purposes, return empty list
    # if folder_id:
    #     query = query.filter(Document.folder_id == folder_id)
    # documents = query.all()
    
    return [
        DocumentResponse(
            id=str(doc.id),
            filename=doc.filename,
            original_filename=doc.original_filename,
            file_type=doc.file_type,
            file_size=doc.file_size,
            ai_summary=doc.ai_summary or "",
            ai_tags=doc.ai_tags or [],
            ai_key_concepts=doc.ai_key_concepts or [],
            created_at=doc.created_at
        )
        for doc in documents
    ]

@router.post("/{document_id}/chat", response_model=ChatResponse)
async def chat_with_document(
    document_id: str,
    chat_request: ChatRequest,
    db: Session = Depends(get_db)
):
    """Chat with a specific document"""
    
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.owner_id == "temp-user-id"
    ).first()
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if not document.extracted_text:
        raise HTTPException(status_code=400, detail="Document text not available")
    
    answer = await gemini_service.chat_with_document(
        document.extracted_text,
        chat_request.question
    )
    
    return ChatResponse(
        answer=answer,
        document_id=document_id
    )

@router.post("/{document_id}/flashcards")
async def generate_flashcards(document_id: str, count: int = 10, db: Session = Depends(get_db)):
    """Generate flashcards from document"""
    
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.owner_id == "temp-user-id"
    ).first()
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    flashcards = await gemini_service.generate_flashcards(document.extracted_text, count)
    
    return {"flashcards": flashcards}

@router.post("/{document_id}/quiz")
async def generate_quiz(
    document_id: str,
    difficulty: str = "medium",
    count: int = 5,
    db: Session = Depends(get_db)
):
    """Generate quiz from document"""
    
    document = db.query(Document).filter(
        Document.id == document_id,
        Document.owner_id == "temp-user-id"
    ).first()
    
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    quiz = await gemini_service.generate_quiz(document.extracted_text, difficulty, count)
    
    return quiz

async def extract_text_from_file(file_path: str, content_type: str) -> str:
    """Extract text from uploaded file - placeholder implementation"""
    
    if content_type == 'text/plain':
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    
    # For other file types, you would use libraries like:
    # - PyPDF2 or pdfplumber for PDFs
    # - python-docx for DOCX files
    # - python-pptx for PowerPoint files
    # - OCR libraries like pytesseract for images
    
    return f"Extracted text from {content_type} file (placeholder implementation)"