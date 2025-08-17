from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
import uuid

from ..models.database import SessionLocal, Note, Folder
from ..services.gemini_service import gemini_service

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class NoteCreate(BaseModel):
    title: str
    content: str
    folder_id: Optional[str] = None

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    folder_id: Optional[str] = None

class NoteResponse(BaseModel):
    id: str
    title: str
    content: str
    folder_id: Optional[str]
    ai_summary: Optional[str]
    ai_tags: Optional[List[str]]
    created_at: datetime
    updated_at: datetime

@router.post("/", response_model=NoteResponse)
async def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    """Create a new note with AI enhancement"""
    
    # Create note
    db_note = Note(
        title=note.title,
        content=note.content,
        folder_id=note.folder_id,
        owner_id=str(uuid.uuid4())  # TODO: Get from auth
    )
    
    # Generate AI enhancements
    if note.content:
        db_note.ai_summary = await gemini_service.generate_summary(note.content)
        db_note.ai_tags = await gemini_service.extract_key_concepts(note.content)
    
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    
    return NoteResponse(
        id=str(db_note.id),
        title=db_note.title,
        content=db_note.content,
        folder_id=str(db_note.folder_id) if db_note.folder_id else None,
        ai_summary=db_note.ai_summary,
        ai_tags=db_note.ai_tags,
        created_at=db_note.created_at,
        updated_at=db_note.updated_at
    )

@router.get("/", response_model=List[NoteResponse])
async def get_notes(folder_id: Optional[str] = None, db: Session = Depends(get_db)):
    """Get all notes, optionally filtered by folder"""
    
    # For demo purposes, return empty list since we don't have auth yet
    # query = db.query(Note).filter(Note.owner_id == "temp-user-id")
    notes = []
    
    # For demo purposes, return empty list
    # if folder_id:
    #     query = query.filter(Note.folder_id == folder_id)
    # notes = query.all()
    
    return [
        NoteResponse(
            id=str(note.id),
            title=note.title,
            content=note.content,
            folder_id=str(note.folder_id) if note.folder_id else None,
            ai_summary=note.ai_summary,
            ai_tags=note.ai_tags,
            created_at=note.created_at,
            updated_at=note.updated_at
        )
        for note in notes
    ]

@router.get("/{note_id}", response_model=NoteResponse)
async def get_note(note_id: str, db: Session = Depends(get_db)):
    """Get a specific note"""
    
    note = db.query(Note).filter(
        Note.id == note_id,
        Note.owner_id == "temp-user-id"
    ).first()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return NoteResponse(
        id=str(note.id),
        title=note.title,
        content=note.content,
        folder_id=str(note.folder_id) if note.folder_id else None,
        ai_summary=note.ai_summary,
        ai_tags=note.ai_tags,
        created_at=note.created_at,
        updated_at=note.updated_at
    )

@router.put("/{note_id}", response_model=NoteResponse)
async def update_note(note_id: str, note_update: NoteUpdate, db: Session = Depends(get_db)):
    """Update a note with AI re-enhancement"""
    
    note = db.query(Note).filter(
        Note.id == note_id,
        Note.owner_id == "temp-user-id"
    ).first()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    # Update fields
    if note_update.title is not None:
        note.title = note_update.title
    if note_update.content is not None:
        note.content = note_update.content
        # Re-generate AI enhancements
        note.ai_summary = await gemini_service.generate_summary(note_update.content)
        note.ai_tags = await gemini_service.extract_key_concepts(note_update.content)
    if note_update.folder_id is not None:
        note.folder_id = note_update.folder_id
    
    note.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(note)
    
    return NoteResponse(
        id=str(note.id),
        title=note.title,
        content=note.content,
        folder_id=str(note.folder_id) if note.folder_id else None,
        ai_summary=note.ai_summary,
        ai_tags=note.ai_tags,
        created_at=note.created_at,
        updated_at=note.updated_at
    )

@router.delete("/{note_id}")
async def delete_note(note_id: str, db: Session = Depends(get_db)):
    """Delete a note"""
    
    note = db.query(Note).filter(
        Note.id == note_id,
        Note.owner_id == "temp-user-id"
    ).first()
    
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    db.delete(note)
    db.commit()
    
    return {"message": "Note deleted successfully"}