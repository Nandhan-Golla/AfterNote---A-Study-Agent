import google.generativeai as genai
from typing import List, Dict, Any, Optional
import json
import asyncio
from ..core.config import settings

class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
    
    async def generate_summary(self, text: str, max_length: int = 200) -> str:
        """Generate AI summary of text content"""
        prompt = f"""
        Summarize the following text in {max_length} characters or less. 
        Make it clear, concise, and student-friendly:
        
        {text}
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"Summary generation failed: {str(e)}"
    
    async def extract_key_concepts(self, text: str) -> List[str]:
        """Extract key concepts from text"""
        prompt = f"""
        Extract the top 10 key concepts from this text. 
        Return only a JSON array of strings, no other text:
        
        {text}
        """
        
        try:
            response = self.model.generate_content(prompt)
            concepts = json.loads(response.text.strip())
            return concepts if isinstance(concepts, list) else []
        except:
            return []
    
    async def generate_flashcards(self, text: str, count: int = 10) -> List[Dict[str, str]]:
        """Generate flashcards from content"""
        prompt = f"""
        Create {count} flashcards from this content. 
        Return as JSON array with objects having 'question' and 'answer' fields:
        
        {text}
        """
        
        try:
            response = self.model.generate_content(prompt)
            flashcards = json.loads(response.text.strip())
            return flashcards if isinstance(flashcards, list) else []
        except:
            return []
    
    async def generate_quiz(self, text: str, difficulty: str = "medium", count: int = 5) -> Dict[str, Any]:
        """Generate quiz questions from content"""
        prompt = f"""
        Create a {difficulty} difficulty quiz with {count} multiple choice questions from this content.
        Return as JSON with structure:
        {{
            "questions": [
                {{
                    "question": "Question text",
                    "options": ["A", "B", "C", "D"],
                    "correct_answer": 0,
                    "explanation": "Why this is correct"
                }}
            ]
        }}
        
        Content: {text}
        """
        
        try:
            response = self.model.generate_content(prompt)
            quiz = json.loads(response.text.strip())
            return quiz
        except:
            return {"questions": []}
    
    async def chat_with_document(self, document_text: str, question: str) -> str:
        """Chat with document content"""
        prompt = f"""
        Based on this document content, answer the following question in a helpful, student-friendly way:
        
        Document: {document_text}
        
        Question: {question}
        
        Answer:
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"I couldn't process that question. Error: {str(e)}"
    
    async def explain_concept(self, concept: str, level: str = "intermediate") -> str:
        """Explain concept at different levels"""
        level_prompts = {
            "beginner": "Explain like I'm 5 years old",
            "intermediate": "Explain like I'm a college student", 
            "advanced": "Explain like I'm a graduate student"
        }
        
        prompt = f"""
        {level_prompts.get(level, level_prompts['intermediate'])}: {concept}
        
        Make it engaging and easy to understand with examples.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            return f"Explanation failed: {str(e)}"
    
    async def generate_mindmap_data(self, text: str) -> Dict[str, Any]:
        """Generate mind map structure from content"""
        prompt = f"""
        Create a mind map structure from this content. Return as JSON:
        {{
            "central_topic": "Main topic",
            "branches": [
                {{
                    "name": "Branch name",
                    "children": [
                        {{"name": "Sub-concept 1"}},
                        {{"name": "Sub-concept 2"}}
                    ]
                }}
            ]
        }}
        
        Content: {text}
        """
        
        try:
            response = self.model.generate_content(prompt)
            mindmap = json.loads(response.text.strip())
            return mindmap
        except:
            return {"central_topic": "Content", "branches": []}

# Global instance
gemini_service = GeminiService()