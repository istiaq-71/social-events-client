import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasJoined, setHasJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetchEventDetails();
    if (user) {
      checkIfJoined();
    }
  }, [id, user]);

  const fetchEventDetails = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/events/${id}`);
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      toast.error('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const checkIfJoined = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(
        `${apiUrl}/api/check-join/${id}/${user.email}`
      );
      const data = await response.json();
      setHasJoined(data.joined);
    } catch (error) {
    }
  };

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error('Please login to join the event');
      navigate('/login', { state: { from: `/event/${id}` } });
      return;
    }

    setJoining(true);

    const joinData = {
      eventId: event._id,
      eventTitle: event.title,
      eventDate: event.eventDate,
      eventLocation: event.location,
      eventThumbnail: event.thumbnailUrl,
      userEmail: user.email,
      userName: user.displayName
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/join-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(joinData)
      });

      if (response.ok) {
        toast.success('Successfully joined the event!');
        setHasJoined(true);
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to join event');
      }
    } catch (error) {
      toast.error('Error joining event');
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <LoadingSpinner size="lg" text="Loading event details..." />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-500">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-8 bg-gray-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.8
        }}
        className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden"
      >
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={event.thumbnailUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="mb-4">
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {event.eventType}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg px-2">
              {event.title}
            </h1>
          </div>
        </div>
        
        <div className="p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.1,
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.8
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800"
            >
              <motion.div 
                className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <FaCalendarAlt className="text-white text-xl" />
              </motion.div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Event Date</p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {new Date(event.eventDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.8
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800"
            >
              <motion.div 
                className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <FaMapMarkerAlt className="text-white text-xl" />
              </motion.div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</p>
                <p className="font-bold text-gray-900 dark:text-white">{event.location}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.8
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800"
            >
              <motion.div 
                className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <FaUser className="text-white text-xl" />
              </motion.div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Organizer</p>
                <p className="font-bold text-gray-900 dark:text-white">{event.creatorName}</p>
              </div>
            </motion.div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              About This Event
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {event.description}
            </p>
          </div>

          {hasJoined ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-green-600 text-white px-8 py-6 rounded-xl text-center font-bold text-lg shadow-lg"
            >
              ✓ You have successfully joined this event!
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 15px 35px rgba(34,197,94,0.4)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleJoinEvent}
              disabled={joining}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 md:py-5 rounded-xl text-base sm:text-lg md:text-xl font-bold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
            >
              {joining ? 'Joining Event...' : '✨ Join This Event'}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;