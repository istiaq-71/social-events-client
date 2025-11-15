import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaSeedling } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { sampleEvents } from '../data/sampleEvents';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventType, setEventType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSeedingEvents, setIsSeedingEvents] = useState(false);

  const eventTypes = ['all', 'Cleanup', 'Plantation', 'Donation', 'Education', 'Healthcare', 'Other'];

  useEffect(() => {
    fetchEvents();
  }, [eventType, searchTerm]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const endpoints = [
        `${apiUrl}/api/events`,
        `${apiUrl}/events`,
        `${apiUrl}/event`
      ];

      let params = '';
      if (eventType !== 'all') {
        params += `?eventType=${eventType}`;
      }
      if (searchTerm) {
        params += eventType !== 'all' ? `&search=${searchTerm}` : `?search=${searchTerm}`;
      }

      let data = null;
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(`${endpoint}${params}`);
          if (response.ok) {
            data = await response.json();
            break;
          }
        } catch (e) {
          // Try next endpoint
        }
      }

      if (data) {
        setEvents(Array.isArray(data) ? data : []);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  const handleSeedEvents = async () => {
    setIsSeedingEvents(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('Seeding events to:', apiUrl);
      
      let successCount = 0;
      let failureCount = 0;

      for (const event of sampleEvents) {
        try {
          const response = await fetch(`${apiUrl}/api/events`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
          });

          if (response.ok) {
            successCount++;
          } else {
            failureCount++;
          }
        } catch (error) {
          failureCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`✅ Added ${successCount} events successfully!`);
        // Refresh the events list
        await new Promise(resolve => setTimeout(resolve, 500));
        fetchEvents();
      }
      if (failureCount > 0) {
        toast.error(`⚠️ Failed to add ${failureCount} events`);
      }
    } catch (error) {
      console.error('Error seeding events:', error);
      toast.error('Error seeding events. Check console for details.');
    } finally {
      setIsSeedingEvents(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <LoadingSpinner size="lg" text="Loading events..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Upcoming <span className="text-green-600 dark:text-green-400">Events</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Find and join social development events in your community
          </p>
        </motion.div>

        {/* Filter and Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto mb-12 space-y-6"
        >
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events by name..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:border-green-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all"
            >
              Search
            </motion.button>
          </form>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {eventTypes.map(type => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEventType(type)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  eventType === type
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Seed Events Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSeedEvents}
              disabled={isSeedingEvents}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all flex items-center gap-2 mx-auto"
            >
              <FaSeedling />
              {isSeedingEvents ? 'Adding Events...' : 'Add Sample Events'}
            </motion.button>
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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700 group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
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