import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaStar } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const eventTypes = ['all', 'Cleanup', 'Plantation', 'Donation', 'Education', 'Healthcare', 'Other'];

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      let url = `${apiUrl}/api/events?`;
      if (eventType !== 'all') {
        url += `eventType=${eventType}&`;
      }
      if (searchTerm) {
        url += `search=${searchTerm}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, eventType]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <LoadingSpinner size="lg" text="Loading events..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8
          }}
          className="text-center mb-16 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-96 h-96 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl"
            />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 dark:from-green-500/10 dark:to-blue-500/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-green-500/30 dark:border-green-500/20"
          >
            <FaStar className="text-green-600 dark:text-green-400 animate-pulse" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">
              Discover & Join
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 120,
              damping: 18
            }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 relative"
          >
            <span className="block mb-2">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Upcoming
              </span>
            </span>
            <span className="block">
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-blue-600 dark:from-green-400 dark:via-green-300 dark:to-blue-400 bg-clip-text text-transparent animate-gradient">
                Events
              </span>
            </span>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              transition={{ 
                delay: 0.6, 
                duration: 1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="h-1 bg-gradient-to-r from-green-600 via-blue-500 to-green-600 rounded-full mt-4 mx-auto max-w-xs"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Find and join <span className="font-semibold text-green-600 dark:text-green-400">social development events</span> in your community
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.7,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-green-600 dark:text-green-400" />
              <span>Live Events</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
              <span>Multiple Locations</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <FaStar className="text-purple-600 dark:text-purple-400" />
              <span>Make an Impact</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Filter and Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto mb-8 sm:mb-12 space-y-4 sm:space-y-6 px-4 sm:px-6"
        >
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events by name..."
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:border-green-500 text-sm sm:text-base min-h-[44px]"
              />
            </div>
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchTerm('')}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg transition-all text-sm sm:text-base min-h-[44px] touch-manipulation whitespace-nowrap"
              >
                Clear
              </motion.button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {eventTypes.map(type => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEventType(type)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-xs sm:text-sm md:text-base min-h-[44px] touch-manipulation ${
                  eventType === type
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No upcoming events found</p>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  mass: 0.8
                }}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700 group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="w-full h-56 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      duration: 0.5
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                      {event.eventType}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-green-600" />
                      <span className="text-sm font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-600" />
                      <span className="text-sm font-medium">
                        {new Date(event.eventDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <Link to={`/event/${event._id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
                    >
                      View Details →
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;