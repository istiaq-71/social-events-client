# SocialServe

## 🌐 Live Site
**URL:** https://social-events-client.vercel.app

## 📱 About
SocialServe is a modern community-driven platform that empowers individuals to create, discover, and join social development events in their local communities. From road cleaning initiatives to tree plantations and donation drives, SocialServe connects passionate people who want to make a positive impact.

## ✨ Key Features

• **Event Management System** - Create, manage, and organize social development events with comprehensive details including event type, location, date, and descriptions

• **Advanced Search & Filter** - Real-time search functionality and event type filtering powered by MongoDB backend for quick event discovery

• **User Authentication** - Secure email/password authentication with password validation and Google OAuth integration for seamless login experience

• **Event Participation Tracking** - Join events and track all your participations in a dedicated dashboard with automatic date-based sorting

• **Responsive Design** - Fully responsive interface optimized for mobile phones, tablets, and desktop computers with touch-friendly interactions

• **Dark Mode Support** - Modern theme switching with smooth transitions between light and dark modes for comfortable viewing in any environment

• **Event Gallery** - Beautiful visual showcase of community events with interactive animations and hover effects

• **Newsletter Subscription** - Stay updated with community activities through integrated newsletter subscription system

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/istiaq-71/social-events-client.git
cd social-events-client
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
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

4. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Tech Stack

**Frontend:**
- React 19
- React Router v7
- Tailwind CSS
- Framer Motion
- Firebase Authentication
- React Hot Toast

**Backend:**
- Node.js & Express
- MongoDB
- Vercel Serverless Functions

## 📄 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📝 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for community development**
