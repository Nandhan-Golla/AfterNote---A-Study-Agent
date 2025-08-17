#!/usr/bin/env python3
"""
AfterNote Setup Script
Automated setup for the complete AfterNote application
"""

import os
import sys
import subprocess
import json
from pathlib import Path

def run_command(command, cwd=None, check=True):
    """Run a shell command and return the result"""
    print(f"Running: {command}")
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            cwd=cwd, 
            check=check,
            capture_output=True,
            text=True
        )
        if result.stdout:
            print(result.stdout)
        return result
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {e}")
        if e.stderr:
            print(f"Error output: {e.stderr}")
        if check:
            sys.exit(1)
        return e

def check_requirements():
    """Check if required tools are installed"""
    print("🔍 Checking requirements...")
    
    requirements = {
        'python': 'python --version',
        'uv': 'uv --version',
        'node': 'node --version',
        'npm': 'npm --version'
    }
    
    missing = []
    for tool, command in requirements.items():
        result = run_command(command, check=False)
        if result.returncode != 0:
            missing.append(tool)
        else:
            print(f"✅ {tool}: {result.stdout.strip()}")
    
    if missing:
        print(f"❌ Missing requirements: {', '.join(missing)}")
        print("\nPlease install the missing tools:")
        print("- Python 3.11+: https://python.org")
        print("- uv: https://docs.astral.sh/uv/getting-started/installation/")
        print("- Node.js 18+: https://nodejs.org")
        sys.exit(1)
    
    print("✅ All requirements satisfied!")

def setup_backend():
    """Set up the Python backend"""
    print("\n🐍 Setting up Python backend...")
    
    # Install dependencies with uv
    print("Installing Python dependencies...")
    run_command("uv sync")
    
    # Create .env file if it doesn't exist
    env_file = Path("backend/.env")
    if not env_file.exists():
        print("Creating .env file...")
        env_content = """# Database Configuration
DATABASE_URL=sqlite:///./afternote.db

# AI Configuration  
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_MODEL=gemini-pro

# Security
SECRET_KEY=your-super-secret-key-change-in-production-please-make-it-long-and-random
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# File Storage
UPLOAD_DIR=uploads
MAX_FILE_SIZE=52428800

# Redis Configuration (optional)
REDIS_URL=redis://localhost:6379

# Development
DEBUG=True
ENVIRONMENT=development
"""
        env_file.write_text(env_content)
        print("✅ Created .env file")
    
    # Test backend
    print("Testing backend setup...")
    result = run_command("python test_backend.py", check=False)
    if result.returncode == 0:
        print("✅ Backend setup successful!")
    else:
        print("❌ Backend setup failed!")
        return False
    
    return True

def setup_frontend():
    """Set up the React frontend"""
    print("\n⚛️  Setting up React frontend...")
    
    frontend_dir = Path("frontend")
    if not frontend_dir.exists():
        print("❌ Frontend directory not found!")
        return False
    
    # Install dependencies
    print("Installing Node.js dependencies...")
    run_command("npm install", cwd="frontend")
    
    # Test frontend build
    print("Testing frontend build...")
    result = run_command("npm run build", cwd="frontend", check=False)
    if result.returncode == 0:
        print("✅ Frontend setup successful!")
        return True
    else:
        print("❌ Frontend build failed!")
        return False

def create_start_scripts():
    """Create convenient start scripts"""
    print("\n📝 Creating start scripts...")
    
    # Backend start script
    backend_script = """#!/bin/bash
echo "🚀 Starting AfterNote Backend..."
cd backend
python run.py
"""
    
    with open("start-backend.sh", "w") as f:
        f.write(backend_script)
    os.chmod("start-backend.sh", 0o755)
    
    # Frontend start script  
    frontend_script = """#!/bin/bash
echo "⚛️  Starting AfterNote Frontend..."
cd frontend
npm run dev
"""
    
    with open("start-frontend.sh", "w") as f:
        f.write(frontend_script)
    os.chmod("start-frontend.sh", 0o755)
    
    # Combined start script
    combined_script = """#!/bin/bash
echo "🚀 Starting AfterNote (Full Stack)..."

# Start backend in background
echo "Starting backend..."
cd backend && python run.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo "✅ AfterNote is running!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap 'kill $BACKEND_PID $FRONTEND_PID; exit' INT
wait
"""
    
    with open("start-afternote.sh", "w") as f:
        f.write(combined_script)
    os.chmod("start-afternote.sh", 0o755)
    
    print("✅ Created start scripts:")
    print("  - start-backend.sh")
    print("  - start-frontend.sh") 
    print("  - start-afternote.sh")

def main():
    """Main setup function"""
    print("🎓 AfterNote Setup")
    print("=" * 50)
    
    # Check requirements
    check_requirements()
    
    # Setup backend
    if not setup_backend():
        print("❌ Backend setup failed!")
        sys.exit(1)
    
    # Setup frontend
    if not setup_frontend():
        print("❌ Frontend setup failed!")
        sys.exit(1)
    
    # Create start scripts
    create_start_scripts()
    
    print("\n" + "=" * 50)
    print("🎉 AfterNote setup complete!")
    print("\n📋 Next steps:")
    print("1. Add your Gemini API key to backend/.env")
    print("2. Run: ./start-afternote.sh")
    print("3. Open http://localhost:3000 in your browser")
    print("\n🔗 Useful commands:")
    print("  Backend only: ./start-backend.sh")
    print("  Frontend only: ./start-frontend.sh")
    print("  Full stack: ./start-afternote.sh")
    print("\n📚 Documentation: README.md")

if __name__ == "__main__":
    main()