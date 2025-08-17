#!/usr/bin/env python3
"""
Test script to verify AfterNote backend setup
"""

import sys
import os
sys.path.insert(0, 'backend')

def test_imports():
    """Test that all imports work correctly"""
    print("Testing imports...")
    
    try:
        from backend.app.core.config import settings
        print("✅ Config import successful")
        
        from backend.app.models.database import User, Note, Document, init_db
        print("✅ Database models import successful")
        
        from backend.app.services.gemini_service import gemini_service
        print("✅ Gemini service import successful")
        
        from backend.app.main import app
        print("✅ FastAPI app import successful")
        
        return True
    except Exception as e:
        print(f"❌ Import failed: {e}")
        return False

def test_database():
    """Test database initialization"""
    print("\nTesting database...")
    
    try:
        from backend.app.models.database import init_db, SessionLocal
        init_db()
        print("✅ Database initialization successful")
        
        # Test database connection
        db = SessionLocal()
        db.close()
        print("✅ Database connection successful")
        
        return True
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        return False

def test_config():
    """Test configuration"""
    print("\nTesting configuration...")
    
    try:
        from backend.app.core.config import settings
        print(f"✅ Database URL: {settings.DATABASE_URL}")
        print(f"✅ Upload directory: {settings.UPLOAD_DIR}")
        print(f"✅ Gemini model: {settings.GEMINI_MODEL}")
        
        # Check if API key is set (don't print it for security)
        if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your-gemini-api-key-here" and len(settings.GEMINI_API_KEY) > 20:
            print("✅ Gemini API key is configured")
        else:
            print("⚠️  Gemini API key not configured (using placeholder)")
        
        return True
    except Exception as e:
        print(f"❌ Configuration test failed: {e}")
        return False

def main():
    """Run all tests"""
    print("🚀 AfterNote Backend Test Suite")
    print("=" * 40)
    
    tests = [
        test_imports,
        test_config,
        test_database,
    ]
    
    passed = 0
    for test in tests:
        if test():
            passed += 1
    
    print("\n" + "=" * 40)
    print(f"Tests passed: {passed}/{len(tests)}")
    
    if passed == len(tests):
        print("🎉 All tests passed! Backend is ready to run.")
        print("\nTo start the server:")
        print("cd backend && python run.py")
    else:
        print("❌ Some tests failed. Please check the errors above.")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())