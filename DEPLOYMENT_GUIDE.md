# Deployment Guide - Social Events Client

## Current Status ✅

**Backend Deployment:**
- Status: Ready
- Main URL: `https://social-events-server-xi.vercel.app`
- Alternative: `https://social-events-server-tuykvjxct-istiaq71s-projects.vercel.app`

**Frontend Configuration:**
- `.env` Updated: ✅
- `VITE_API_URL`: `https://social-events-server-xi.vercel.app`

---

## Frontend Deployment Steps

### Step 1: Deploy to Vercel (Recommended)

#### Option A: Using Vercel CLI
```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Option B: Using GitHub Integration (Auto-Deploy)
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Select `social-events-client` folder
6. Add environment variables:
   ```
   VITE_APIKEY=AIzaSyB4sO6Qh1PmuFmQm7K_K8t1BZFykuF9QzM
   VITE_AUTHDOMAIN=socialserve-b02b7.firebaseapp.com
   VITE_PROJECTID=socialserve-b02b7
   VITE_STORAGEBUCKET=socialserve-b02b7.firebasestorage.app
   VITE_MESSAGINGSENDERID=231615216940
   VITE_APPID=1:231615216940:web:d9861e70630fc0761c0089
   VITE_MEASUREMENTID=G-S93CK5NH32
   VITE_API_URL=https://social-events-server-xi.vercel.app
   ```
7. Click "Deploy"

### Step 2: Update Environment Variables

**On Vercel Dashboard:**
1. Go to your project
2. Settings → Environment Variables
3. Add all variables from `.env` file
4. Redeploy: `vercel --prod`

---

## Current Issues & Solutions

### Issue: Backend Routes Not Found
**Problem:** Seed script shows "No valid endpoint found"
**Solution:** 
1. Check your backend repository for API route definitions
2. Verify routes match: `/api/events`, `/events`, or `/event`
3. Ensure CORS is enabled on backend
4. Test backend manually: Visit `https://social-events-server-xi.vercel.app/`

### Issue: Events Not Appearing
**Solution:**
1. Open DevTools (F12)
2. Check Console for errors
3. Verify `VITE_API_URL` in `.env`
4. Test API endpoint in browser

---

## How to Add Events (3 Methods)

### Method 1: UI Button (Easiest)
```
1. Go to Upcoming Events page
2. Click "Add Sample Events" button
3. Events appear automatically
```

### Method 2: Manual Form
```
1. Click "Create Event" in navbar
2. Fill in all fields
3. Click "Create Event"
```

### Method 3: Terminal Script
```powershell
cd c:\projects\SocialServe-Project\social-events-client
node seedEvents.js
```

---

## Build & Test Locally

```powershell
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment Checklist

- [ ] Backend API is working and deployed
- [ ] Frontend `.env` has correct `VITE_API_URL`
- [ ] All Firebase credentials in `.env`
- [ ] Test locally: `npm run dev`
- [ ] Build successfully: `npm run build`
- [ ] No build errors
- [ ] Deploy to Vercel: `vercel --prod`
- [ ] Set environment variables on Vercel
- [ ] Test deployed app in browser
- [ ] Seed sample events
- [ ] Test Create Event form
- [ ] Test Upcoming Events page

---

## Important Notes

1. **Firebase Config:** All keys are in `.env` - don't hardcode them
2. **API URL:** Change as needed if backend URL changes
3. **CORS:** Backend must allow CORS from frontend domain
4. **Environment:** Different vars for dev/production can be set in Vercel dashboard
5. **Caching:** Vercel caches builds - clear cache if needed

---

## Next Steps

1. **Verify Backend Routes:**
   - Check backend repository for exact endpoint routes
   - Ensure all required fields are documented
   - Verify database is connected

2. **Test Everything:**
   - Create an event manually first
   - Test seed script once routes are known
   - Test all filters and search

3. **Deploy Frontend:**
   - Use `vercel --prod` command
   - Set environment variables on Vercel
   - Monitor deployment logs

---

## Support Commands

```powershell
# Check Node version
node --version

# Check npm version
npm --version

# Test backend connection
curl https://social-events-server-xi.vercel.app/

# Build for production
npm run build

# Deploy with Vercel
vercel --prod

# View Vercel logs
vercel logs
```
