from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, Boolean, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.types import TypeDecorator, CHAR
from datetime import datetime
import uuid

from ..core.config import settings

# Custom UUID type that works with both PostgreSQL and SQLite
class GUID(TypeDecorator):
    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(UUID(as_uuid=True))
        else:
            return dialect.type_descriptor(CHAR(36))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return str(uuid.UUID(value))
            else:
                return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, uuid.UUID):
                return uuid.UUID(value)
            return value

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Study preferences
    study_level = Column(String, default="intermediate")  # beginner, intermediate, advanced
    learning_style = Column(String, default="visual")     # visual, auditory, kinesthetic
    xp_points = Column(Integer, default=0)
    streak_days = Column(Integer, default=0)
    
    # Relationships
    folders = relationship("Folder", back_populates="owner")
    notes = relationship("Note", back_populates="owner")
    documents = relationship("Document", back_populates="owner")

class Folder(Base):
    __tablename__ = "folders"
    
    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    description = Column(Text)
    parent_id = Column(GUID(), ForeignKey("folders.id"))
    owner_id = Column(GUID(), ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # AI-generated metadata
    ai_tags = Column(JSON)
    ai_summary = Column(Text)
    
    # Relationships
    owner = relationship("User", back_populates="folders")
    parent = relationship("Folder", remote_side=[id])
    children = relationship("Folder")
    notes = relationship("Note", back_populates="folder")

class Note(Base):
    __tablename__ = "notes"
    
    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    content = Column(Text)
    folder_id = Column(GUID(), ForeignKey("folders.id"))
    owner_id = Column(GUID(), ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # AI features
    ai_summary = Column(Text)
    ai_tags = Column(JSON)
    ai_difficulty = Column(String)  # easy, medium, hard
    
    # Relationships
    owner = relationship("User", back_populates="notes")
    folder = relationship("Folder", back_populates="notes")

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    filename = Column(String, nullable=False)
    original_filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_size = Column(Integer)
    owner_id = Column(GUID(), ForeignKey("users.id"))
    folder_id = Column(GUID(), ForeignKey("folders.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # AI-extracted content
    extracted_text = Column(Text)
    ai_summary = Column(Text)
    ai_tags = Column(JSON)
    ai_key_concepts = Column(JSON)
    
    # Relationships
    owner = relationship("User", back_populates="documents")

class MindMap(Base):
    __tablename__ = "mindmaps"
    
    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    data = Column(JSON)  # Mind map structure
    owner_id = Column(GUID(), ForeignKey("users.id"))
    folder_id = Column(GUID(), ForeignKey("folders.id"))
    is_collaborative = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Exam(Base):
    __tablename__ = "exams"
    
    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    questions = Column(JSON)  # Array of questions
    answers = Column(JSON)    # Array of answers
    difficulty = Column(String, default="medium")
    subject = Column(String)
    owner_id = Column(GUID(), ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

# Database initialization function
def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)