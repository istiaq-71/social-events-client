# SocialServe - Community Social Development Events Platform

## 🌍 Live Site
**URL:** [Add your live site URL here after deployment]

## 📱 Project Overview
SocialServe is a modern community-driven event management platform that empowers users to create, discover, join, and manage social development events in their local areas. Whether it's road cleaning initiatives, tree plantations, or donation drives, SocialServe connects passionate individuals to make a real impact in their communities.

## ✨ Key Features

- **🎯 Community Event Management** - Create and organize social development events with detailed information and beautiful UI
- **🔍 Smart Event Discovery** - Browse upcoming events with advanced filtering and real-time search capabilities powered by MongoDB
- **🔐 Seamless Authentication** - Secure email/password and Google OAuth authentication with password validation
- **🌓 Dark Mode Support** - Modern theme toggling with smooth transitions for comfortable viewing in any lighting condition
- **📅 Event Participation Tracking** - Track all events you've joined with automatic date-sorted organization
- **⚙️ Event Creator Dashboard** - Comprehensive dashboard to manage your created events with full update and delete capabilities
- **📱 Fully Responsive Design** - Beautiful, modern UI optimized for mobile, tablet, and desktop devices
- **🔔 Real-time Notifications** - Beautiful toast notifications for all user actions and feedback (no default alerts)
- **✨ Modern Animations** - Smooth Framer Motion animations throughout for enhanced user experience
- **🎨 Custom Date Picker** - Beautiful, accessible custom date picker component (no external dependencies)
- **🎭 Glassmorphism Design** - Modern glassmorphism effects with backdrop blur for a premium look

## 🎨 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and interactions
- **Firebase** - Authentication & hosting
- **React Hot Toast** - Beautiful toast notifications
- **Custom Date Picker** - Beautiful custom-built date picker component
- **React Icons** - Icon library

### Backend
- **Node.js & Express** - Server runtime and framework
- **MongoDB** - NoSQL database
- **Vercel** - Server hosting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <client-repo-url>
   cd social-events-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

## 📖 Usage Guide

### For Users
1. **Register/Login** - Create an account or sign in with Google
2. **Browse Events** - Explore upcoming events on the Upcoming Events page
3. **Search & Filter** - Use search and event type filters to find relevant events
4. **View Details** - Click on any event to see full details
5. **Join Events** - Click "Join Event" to register your participation
6. **Track Participation** - View all joined events in "My Joined Events"

### For Event Creators
1. **Create Event** - Click "Create Event" in the profile dropdown
2. **Fill Details** - Provide event title, description, type, location, and date
3. **Manage Events** - Access "Manage Events" to edit or delete your events
4. **Update Information** - Modify event details as needed

## 🎯 Main Pages

| Page | Type | Description |
|------|------|-------------|
| **Home** | Public | Hero section, features showcase, event gallery, newsletter signup |
| **Upcoming Events** | Public | Displays all upcoming events with search and filter functionality |
| **Event Details** | Public | Shows full event information with join button |
| **Login** | Public | Email/password and Google authentication |
| **Register** | Public | User registration with profile setup |
| **Create Event** | Private | Form to create new social events |
| **Manage Events** | Private | Dashboard to view, edit, and delete created events |
| **Joined Events** | Private | Shows all events the user has joined, sorted by date |

## 🔐 Authentication Features
- Email and password-based authentication
- Google OAuth integration
- Password validation (uppercase, lowercase, minimum 6 characters)
- Protected routes for authenticated users
- Persistent authentication state

## 🎨 Design Highlights
- **Modern UI** - Clean, intuitive interface with gradient accents
- **Responsive Layout** - Mobile-first approach ensuring perfect layout on all devices
- **Dark Mode** - Full dark theme support with smooth transitions
- **Smooth Animations** - Framer Motion for delightful interactions
- **Consistent Branding** - Green and blue gradient color scheme throughout
- **Accessibility** - Proper semantic HTML and ARIA labels

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 📦 Dependencies
- react: ^19.2.0
- react-dom: ^19.2.0
- react-router-dom: ^7.9.5
- tailwindcss: ^4.1.17
- firebase: ^12.5.0
- framer-motion: ^12.23.24
- react-hot-toast: ^2.6.0
- react-datepicker: ^8.9.0
- react-icons: ^5.5.0

## 🌐 Deployment

### Frontend Deployment (Netlify/Firebase)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Vercel)
```bash
vercel deploy
```

## 📝 Notes for Developers
- Ensure all environment variables are set before running
- The app uses MongoDB Atlas for the database
- Firebase is configured for authentication
- All API calls are made to the backend server
- Dark mode preference is stored in localStorage via ThemeProvider

## 🤝 Contributing
Feel free to fork, submit issues, and create pull requests to improve the platform.

## 📄 License
This project is open source and available under the MIT License.

## 📧 Support
For questions or support, please reach out to info@socialserve.com

---

**Made with ❤️ for community development**
