import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import UpcomingEvents from './pages/UpcomingEvents';
import EventDetails from './pages/EventDetails';
import JoinedEvents from './pages/JoinedEvents';
import ManageEvents from './pages/ManageEvents';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upcoming-events" element={<UpcomingEvents />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route
                path="/create-event"
                element={
                  <PrivateRoute>
                    <CreateEvent />
                  </PrivateRoute>
                }
              />
              <Route
                path="/joined-events"
                element={
                  <PrivateRoute>
                    <JoinedEvents />
                  </PrivateRoute>
                }
              />
              <Route
                path="/manage-events"
                element={
                  <PrivateRoute>
                    <ManageEvents />
                  </PrivateRoute>
                }
              />
            </Routes>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;