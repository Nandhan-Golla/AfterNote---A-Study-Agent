# 🚀 AfterNote - Quick Start Guide

## ⚡ **Get Started in 30 Seconds**

AfterNote is ready to use! Here's how to start:

### 1. **Start the Application**
```bash
./start-afternote.sh
```

### 2. **Open Your Browser**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

### 3. **Start Learning!**
- Create your first note
- Upload a document and chat with it
- Generate mind maps from your content
- Try the AI Study Buddy

## 🧠 **Test the AI Right Now**

The AI is working! Try this:

```bash
curl -X POST "http://localhost:8000/api/ai/explain" \
  -H "Content-Type: application/json" \
  -d '{"concept": "quantum physics", "level": "beginner"}'
```

## 📱 **What You Can Do**

### Dashboard
- View your study stats and progress
- Quick actions for common tasks
- Beautiful overview of your learning journey

### Notes
- Create AI-enhanced notes
- Auto-generated summaries and tags
- Smart organization and search

### Documents
- Upload PDFs, DOCX, PPT, images
- Chat with your documents using AI
- Generate flashcards and quizzes

### Mind Maps
- Auto-generate from notes or documents
- Interactive constellation view
- Collaborative editing

### Exam Prep
- AI-generated practice exams
- Adaptive difficulty
- Performance tracking

### Study Buddy
- Multi-level AI explanations
- Voice interaction ready
- Personalized learning

### Community
- XP points and achievements
- Leaderboards
- Share and discover content

## 🛠️ **Development Commands**

```bash
# Backend only
./start-backend.sh

# Frontend only
./start-frontend.sh

# Test everything
python test_backend.py
python demo_api.py

# Setup from scratch
python setup.py
```

## 🎯 **Pro Tips**

1. **Upload a PDF** and ask questions about it
2. **Create notes** and watch AI generate summaries
3. **Try different explanation levels** (beginner → advanced)
4. **Generate mind maps** from your content
5. **Use the community features** to gamify learning

## 🔧 **Troubleshooting**

**Server won't start?**
```bash
python test_backend.py
```

**Frontend issues?**
```bash
cd frontend && npm install && npm run build
```

**AI not working?**
- Check that the Gemini API key is in `backend/.env`
- Verify the model name is `gemini-1.5-flash`

## 🎉 **You're Ready!**

AfterNote is now your personal AI-powered study companion. Enjoy learning smarter, not harder! 📚✨

---

**Need help?** Check the full README.md or run `python setup.py` for diagnostics.