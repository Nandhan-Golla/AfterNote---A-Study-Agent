# AfterNote 🚀

**Next-gen AI-powered study OS for students**

AfterNote is the ultimate NotebookLM++ alternative that transforms how students learn, organize, and prepare for exams. Built with cutting-edge AI, it's designed to be the Discord of studying - fun, social, powerful, and indispensable.

![AfterNote Dashboard](https://via.placeholder.com/800x400/1e293b/ffffff?text=AfterNote+Dashboard)

## ✨ Features

### 📚 Notebook Universe
- **Unlimited Organization**: Folders, subfolders, tags with AI-powered auto-organization
- **Graph View**: Obsidian-like knowledge graph with AI-enhanced connections
- **Smart Search**: Find anything across your entire knowledge base

### 🧠 AI Brain
- **Document Chat**: Upload PDFs, DOCX, PPT, images - chat with your content
- **Auto-Generation**: Summaries, flashcards, quizzes from any content
- **Lecture Mode**: Record audio → transcript + structured notes
- **Whiteboard Camera**: Snap & digitize board content with OCR

### 🗺️ Mind Architect
- **Auto-Generated Mind Maps**: From notes, documents, or concepts
- **Interactive Constellation View**: Beautiful, explorable knowledge maps
- **Collaborative Mapping**: Real-time collaboration on mind maps

### 🎯 ExamPrep SuperTools
- **AI Exam Generator**: Upload syllabus → get personalized practice exams
- **Exam Simulator**: Adaptive difficulty with instant feedback
- **Flashcard System**: Spaced repetition with AI optimization
- **Progress Analytics**: Track weak topics and improvement

### 🤖 Study Buddy AI
- **Multi-Level Explanations**: ELI5 ↔ Professor level explanations
- **Personalized Learning**: Adapts to your learning style (visual, auditory, kinesthetic)
- **Motivational System**: XP, streaks, badges, and achievements
- **Voice Interaction**: Audio-first study mode

### 👥 Community & Collaboration
- **Study Groups**: Join or create subject-specific communities
- **Note Sharing**: Share and discover community notes
- **Leaderboards**: Gamified learning with XP and rankings
- **Collaborative Features**: Group study sessions and live quizzes

## 🛠️ Tech Stack

### Backend (Python)
- **FastAPI**: High-performance async API framework
- **SQLAlchemy**: Database ORM with PostgreSQL
- **Gemini AI**: Google's advanced AI for content generation
- **Redis**: Caching and real-time features
- **Celery**: Background task processing

### Frontend (React)
- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **React Query**: Server state management
- **Zustand**: Client state management

### AI & Integrations
- **Gemini API**: Advanced AI capabilities
- **PDF.js**: PDF processing and rendering
- **OCR**: Image text extraction
- **TTS/STT**: Text-to-speech and speech-to-text
- **WebSockets**: Real-time collaboration

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- uv (Python package manager)

### Automated Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd afternote
   ```

2. **Run the setup script**
   ```bash
   python setup.py
   ```

3. **Add your Gemini API key**
   ```bash
   # Edit backend/.env and add your API key
   GEMINI_API_KEY=your-actual-api-key-here
   ```

4. **Start AfterNote**
   ```bash
   ./start-afternote.sh
   ```

5. **Open your browser**
   ```
   Frontend: http://localhost:3000
   Backend API: http://localhost:8000
   ```

### Manual Setup

#### Backend Setup

1. **Install dependencies with uv**
   ```bash
   uv sync
   ```

2. **Configure environment**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your Gemini API key
   ```

3. **Test the backend**
   ```bash
   python test_backend.py
   ```

4. **Start the backend**
   ```bash
   ./start-backend.sh
   # OR
   cd backend && python run.py
   ```

#### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend && npm install
   ```

2. **Start development server**
   ```bash
   ./start-frontend.sh
   # OR
   cd frontend && npm run dev
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost/afternote

# AI Configuration
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-pro

# Security
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# File Storage
UPLOAD_DIR=uploads
MAX_FILE_SIZE=52428800  # 50MB

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

### Gemini API Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file
3. The AI features will automatically work!

## 📱 Features Walkthrough

### 1. Dashboard
- **Study Stats**: Track your progress with XP, streaks, and achievements
- **Quick Actions**: Jump into note creation, document upload, or mind mapping
- **Recent Activity**: See your latest study sessions and progress

### 2. Notes
- **Rich Editor**: Markdown support with live preview
- **AI Enhancement**: Auto-generated summaries and tags
- **Smart Organization**: Folder structure with AI-powered categorization

### 3. Documents
- **Multi-Format Support**: PDF, DOCX, PPT, images, text files
- **AI Processing**: Automatic text extraction and analysis
- **Interactive Chat**: Ask questions about your documents
- **Study Tools**: Generate flashcards and quizzes from content

### 4. Mind Maps
- **Auto-Generation**: Create mind maps from notes or documents
- **Constellation View**: Beautiful, interactive visualization
- **Collaboration**: Real-time collaborative editing

### 5. Exam Prep
- **Practice Exams**: AI-generated questions based on your content
- **Adaptive Difficulty**: Questions adjust to your skill level
- **Performance Analytics**: Track improvement and identify weak areas

### 6. Study Buddy
- **AI Chat**: Get explanations at your preferred complexity level
- **Voice Mode**: Audio-first studying experience
- **Personalization**: Learns your learning style and preferences

### 7. Community
- **Leaderboards**: Compete with other students
- **Study Groups**: Join subject-specific communities
- **Content Sharing**: Share and discover notes and resources

## 🎨 Design Philosophy

AfterNote is designed with a **student-first** approach:

- **Lovable UI**: Dark theme with gradient accents and smooth animations
- **Gamification**: XP system, streaks, badges, and achievements
- **Social Learning**: Community features that make studying collaborative
- **AI-First**: Every feature is enhanced with intelligent automation
- **Mobile-Friendly**: Responsive design that works on all devices

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core note-taking and organization
- ✅ Document upload and AI processing
- ✅ Basic mind mapping
- ✅ AI chat and explanations
- ✅ Community features

### Phase 2 (Coming Soon)
- 🔄 Real-time collaboration
- 🔄 Advanced OCR and handwriting recognition
- 🔄 Voice recording and transcription
- 🔄 Mobile app (React Native)
- 🔄 Advanced analytics and insights

### Phase 3 (Future)
- 📋 AR mode for interactive 3D explanations
- 📋 Advanced spaced repetition algorithms
- 📋 Integration with university systems
- 📋 AI research assistant with citations
- 📋 Advanced collaboration tools

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini**: For powering our AI features
- **FastAPI**: For the excellent Python web framework
- **React**: For the amazing frontend library
- **TailwindCSS**: For beautiful, utility-first styling
- **The Open Source Community**: For all the amazing tools and libraries

## 🔧 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if Python 3.11+ is installed: `python --version`
- Ensure all dependencies are installed: `uv sync`
- Verify database connection in `backend/.env`
- Run the test script: `python test_backend.py`

**Frontend build fails:**
- Check if Node.js 18+ is installed: `node --version`
- Clear node_modules: `rm -rf frontend/node_modules && cd frontend && npm install`
- Check for TypeScript errors: `cd frontend && npm run build`

**AI features not working:**
- Ensure you have a valid Gemini API key in `backend/.env`
- Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Check API key format: `GEMINI_API_KEY=your-actual-key-here`

**Database issues:**
- Default uses SQLite (no setup required)
- For PostgreSQL: Install and configure PostgreSQL, update `DATABASE_URL`
- Check database file permissions for SQLite

### Getting Help

Run the automated setup script for detailed diagnostics:
```bash
python setup.py
```

## 📞 Support

- **Documentation**: [docs.afternote.com](https://docs.afternote.com)
- **Discord**: [Join our community](https://discord.gg/afternote)
- **Email**: support@afternote.com
- **Issues**: [GitHub Issues](https://github.com/afternote/afternote/issues)

---

**Made with ❤️ for students worldwide**

*AfterNote - Where AI meets education. Study smarter, not harder.* 🎓✨