#!/usr/bin/env python3
"""
AfterNote API Demo
Test the API endpoints to ensure everything is working
"""

import requests
import json
import time
import sys

BASE_URL = "http://localhost:8000"

def test_api_endpoint(endpoint, method="GET", data=None):
    """Test an API endpoint"""
    url = f"{BASE_URL}{endpoint}"
    
    try:
        if method == "GET":
            response = requests.get(url, timeout=5)
        elif method == "POST":
            response = requests.post(url, json=data, timeout=5)
        
        if response.status_code == 200:
            print(f"✅ {method} {endpoint} - Success")
            return response.json()
        else:
            print(f"❌ {method} {endpoint} - Failed ({response.status_code})")
            return None
            
    except requests.exceptions.ConnectionError:
        print(f"❌ {method} {endpoint} - Connection failed (is the server running?)")
        return None
    except Exception as e:
        print(f"❌ {method} {endpoint} - Error: {e}")
        return None

def main():
    """Run API demo"""
    print("🚀 AfterNote API Demo")
    print("=" * 40)
    
    # Test basic endpoints
    endpoints = [
        "/",
        "/health",
        "/api/notes",
        "/api/documents", 
        "/api/mindmaps",
        "/api/exams",
        "/api/community/leaderboard",
    ]
    
    print("Testing API endpoints...")
    for endpoint in endpoints:
        test_api_endpoint(endpoint)
        time.sleep(0.1)  # Small delay between requests
    
    # Test AI endpoints
    print("\nTesting AI endpoints...")
    ai_endpoints = [
        ("/api/ai/motivate", "GET"),
        ("/api/ai/explain", "POST", {"concept": "photosynthesis", "level": "beginner"}),
    ]
    
    for endpoint, method, *data in ai_endpoints:
        test_data = data[0] if data else None
        test_api_endpoint(endpoint, method, test_data)
        time.sleep(0.1)
    
    print("\n" + "=" * 40)
    print("🎉 API demo complete!")
    print("\nIf all tests passed, your AfterNote backend is working correctly!")
    print("You can now start the frontend and begin using the application.")

if __name__ == "__main__":
    main()