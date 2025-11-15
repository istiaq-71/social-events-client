# How to Add Sample Events

You now have **3 ways** to add sample events to your application:

## Method 1: Manual UI Button (Easiest) ✨

1. Go to **Upcoming Events** page
2. Click the blue **"Add Sample Events"** button
3. The app will automatically create 8 sample events in your backend
4. You'll see a success toast notification with how many events were added

**Pros:** 
- No terminal needed
- Visual feedback
- Fastest for testing

---

## Method 2: Using Node.js Script 🚀

Run this command from the project root:

```powershell
node seedEvents.js
```

This will:
- Connect to your API URL from `.env`
- Create all 8 sample events
- Show progress in the terminal
- Display success/failure counts

**Pros:**
- Good for CI/CD pipelines
- Automated testing
- Can be run in production

---

## Method 3: Manual Event Creation Form 📝

1. Click **"Create Event"** in the navbar
2. Fill in the form with:
   - **Title:** Event name
   - **Description:** Detailed event info (minimum 20 characters)
   - **Event Type:** Choose from dropdown
   - **Thumbnail URL:** Image URL (can use from `sampleEvents.js`)
   - **Location:** Where the event happens
   - **Date:** Future date only
3. Click **"Create Event"**

**Pros:**
- Full control over event details
- Can customize as needed
- Good for learning

---

## Sample Events Included

The following 8 sample events are created:

1. **Community Road Cleanup in Mirpur** (Cleanup)
2. **Tree Plantation Drive 2025** (Plantation)
3. **Health Checkup Camp** (Healthcare)
4. **Educational Workshop: Basic Computer Skills** (Education)
5. **Charity Donation Drive for Children** (Donation)
6. **Community Sports Day 2025** (Other)
7. **Environmental Awareness Seminar** (Education)
8. **Blood Donation Camp** (Healthcare)

All events have:
- ✅ Future dates (automatically calculated)
- ✅ Professional descriptions
- ✅ Real image URLs from Unsplash
- ✅ Realistic locations in Dhaka
- ✅ Proper creator information

---

## Important Notes

- **Events are dated in the future** so they appear in "Upcoming Events"
- **All dates are dynamically calculated** from today's date
- **No authentication required** for seeding (for testing purposes)
- **You can seed multiple times** - duplicates may occur
- **Check your network tab** if events don't appear

---

## Troubleshooting

### Backend Returns HTML/Error (API Down)
This means your backend may be down or not properly deployed. 

**Check your backend:**
1. Go to your backend repository
2. Ensure it's deployed to Vercel
3. Verify the API endpoint is working:
   ```
   https://social-events-server-pzjozxjjt-istiaq71s-projects.vercel.app/api/events
   ```
4. If it returns HTML error, the backend needs fixing

**For now, use the Manual Form method** to create events one by one.

### Events don't appear after clicking "Add Sample Events"
1. Open **Developer Tools** (F12)
2. Go to **Console** tab
3. Check for error messages
4. Verify `VITE_API_URL` in your `.env` file
5. Make sure your backend is running

### Script command not working
Make sure you're in the correct directory:
```powershell
cd c:\projects\SocialServe-Project\social-events-client
node seedEvents.js
```

### Backend connection errors
1. Verify your `.env` file has the correct `VITE_API_URL`
2. Test the API: Open browser and visit: `https://social-events-server-pzjozxjjt-istiaq71s-projects.vercel.app/api/events`
3. Check if backend is running/deployed

---

## Files Created

- `src/data/sampleEvents.js` - Sample event data
- `seedEvents.js` - Node.js seeding script

These are reusable and can be modified to add different events!
