# Quick Deployment Commands

## 1️⃣ Deploy Frontend to Vercel (RECOMMENDED)

### First Time Setup:
```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel (opens browser)
vercel login

# Navigate to project
cd c:\projects\SocialServe-Project\social-events-client

# Deploy to production
vercel --prod
```

### Subsequent Deployments:
```powershell
cd c:\projects\SocialServe-Project\social-events-client
vercel --prod
```

---

## 2️⃣ Add Sample Events

### Via UI Button:
1. `npm run dev` - Start dev server
2. Go to **Upcoming Events** page
3. Click **"Add Sample Events"** button
4. Wait for success notification

### Via Terminal:
```powershell
cd c:\projects\SocialServe-Project\social-events-client
node seedEvents.js
```

---

## 3️⃣ Test Locally Before Deployment

```powershell
cd c:\projects\SocialServe-Project\social-events-client

# Install dependencies (first time only)
npm install

# Run development server
npm run dev

# In another terminal - test the app works, create an event, check upcoming events

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 4️⃣ Set Environment Variables on Vercel

After deploying, set these in Vercel Dashboard (Settings → Environment Variables):

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

---

## 5️⃣ Troubleshooting

| Issue | Solution |
|-------|----------|
| `vercel command not found` | Run `npm install -g vercel` |
| Build fails | Run `npm install` then `npm run build` |
| Events won't seed | Check backend is deployed and API routes exist |
| App shows wrong API URL | Verify `.env` file has correct `VITE_API_URL` |
| Can't connect to backend | Test: `https://social-events-server-xi.vercel.app/` |

---

## 📊 Current Setup

| Component | Status | URL |
|-----------|--------|-----|
| Backend | ✅ Ready | https://social-events-server-xi.vercel.app |
| Frontend | 📝 Ready to Deploy | (will be assigned by Vercel) |
| Firebase | ✅ Configured | socialserve-b02b7 |
| Database | ✅ Connected | (Backend) |

---

## Useful Links

- Vercel Dashboard: https://vercel.com
- Firebase Console: https://console.firebase.google.com
- GitHub Repo: https://github.com/istiaq-71/social-events-client

---

## Done! ✅

Your app is ready to deploy. Just run:
```powershell
vercel --prod
```
