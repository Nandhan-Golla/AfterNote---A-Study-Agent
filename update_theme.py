#!/usr/bin/env python3
"""
Update AfterNote theme from purple gradients to dark theme
"""

import os
import re
from pathlib import Path

def update_file_theme(file_path):
    """Update theme colors in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace purple/pink gradients with blue
        content = re.sub(r'bg-gradient-to-r from-purple-500 to-pink-500', 'bg-blue-600', content)
        content = re.sub(r'hover:from-purple-600 hover:to-pink-600', 'hover:bg-blue-700', content)
        content = re.sub(r'from-purple-500 to-pink-500', 'from-blue-500 to-blue-600', content)
        
        # Replace slate with gray for backgrounds
        content = re.sub(r'bg-slate-800/50 backdrop-blur-xl', 'bg-gray-800', content)
        content = re.sub(r'bg-slate-800/95 backdrop-blur-xl', 'bg-gray-800', content)
        content = re.sub(r'bg-slate-800', 'bg-gray-800', content)
        content = re.sub(r'bg-slate-700', 'bg-gray-700', content)
        content = re.sub(r'border-slate-700', 'border-gray-700', content)
        content = re.sub(r'border-slate-600', 'border-gray-600', content)
        content = re.sub(r'hover:border-slate-600', 'hover:border-gray-600', content)
        content = re.sub(r'hover:bg-slate-700', 'hover:bg-gray-700', content)
        
        # Replace other purple/pink gradients
        content = re.sub(r'from-purple-500/20 to-pink-500/20', 'from-gray-700 to-gray-800', content)
        content = re.sub(r'border-purple-500/30', 'border-gray-600', content)
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {file_path}")
            return True
        return False
        
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

def main():
    """Update theme across all frontend files"""
    frontend_dir = Path("frontend/src")
    
    if not frontend_dir.exists():
        print("Frontend directory not found!")
        return
    
    updated_files = 0
    
    # Find all TypeScript/React files
    for file_path in frontend_dir.rglob("*.tsx"):
        if update_file_theme(file_path):
            updated_files += 1
    
    for file_path in frontend_dir.rglob("*.ts"):
        if update_file_theme(file_path):
            updated_files += 1
    
    # Update CSS files
    for file_path in frontend_dir.rglob("*.css"):
        if update_file_theme(file_path):
            updated_files += 1
    
    print(f"\n✅ Updated {updated_files} files to dark theme")
    print("🎨 Theme changed from purple gradients to dark gray/blue")

if __name__ == "__main__":
    main()