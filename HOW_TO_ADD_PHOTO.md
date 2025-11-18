# How to Add Your Photo - Step by Step Guide

## Method 1: Using Imgur (Recommended - Easiest)

1. Go to https://imgur.com
2. Click "New post" button (top left)
3. Upload your photo
4. After upload, right-click on the image
5. Select "Copy image address"
6. You'll get a URL like: `https://i.imgur.com/abc123.jpg`
7. Open `src/pages/Home.jsx` file
8. Find line 10: `const FOUNDER_PHOTO_URL = '...'`
9. Replace with your Imgur URL

## Method 2: Add Photo to Project Folder

1. Copy your photo file
2. Paste it in: `social-events-client/public/` folder
3. Name it: `founder-photo.jpg` (or `.png`)
4. Update line 10 in `Home.jsx` to:
   ```javascript
   const FOUNDER_PHOTO_URL = '/founder-photo.jpg';
   ```

## Method 3: Google Drive (If Public)

1. Upload photo to Google Drive
2. Right-click → Share → "Anyone with the link"
3. Get the file ID from URL
4. Use format: `https://drive.google.com/uc?export=view&id=YOUR_FILE_ID`

## Current Status

Your Google Drive link might not be working because:
- File is not publicly shared
- Google Drive sometimes blocks direct image access

**Best Solution: Use Imgur (Method 1) - It's free and always works!**

