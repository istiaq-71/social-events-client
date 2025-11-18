import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const JoinedEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJoinedEvents();
  }, [user]);

  const fetchJoinedEvents = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(
        `${apiUrl}/api/joined-events/${user.email}`
      );
      const data = await response.json();
      
      // Sort events by date
      const sortedEvents = data.sort((a, b) => 
        new Date(a.eventDate) - new Date(b.eventDate)
      );
      
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching joined events:', error);
      toast.error('Failed to load joined events');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEvent = async (joinId) => {
    if (!confirm('Are you sure you want to remove this event from your joined events?')) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(
        `${apiUrl}/api/joined-events/${joinId}`,
        {
          method: 'DELETE'
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success('Event removed from your list successfully!');
        fetchJoinedEvents();
      } else {
        toast.error(data.message || 'Failed to remove event');
        console.error('Remove error:', data);
      }
    } catch (error) {
      console.error('Error removing event:', error);
      toast.error('Error removing event. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <LoadingSpinner size="lg" text="Loading your events..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-8 bg-gray-50 dark:bg-slate-800">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            My Joined <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg px-2">
            Track all the events you've joined, organized by date
          </p>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl shadow-lg"
          >
            <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              No joined events yet
            </p>
            <p className="text-gray-500 dark:text-gray-500 mb-8">
              Explore and join events to get started!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => {
              const eventDate = new Date(event.eventDate);
              const today = new Date();
              const isUpcoming = eventDate > today;
              const isPast = eventDate < today;

              return (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden border-l-4 transition-all ${
                    isPast 
                      ? 'border-l-gray-400 opacity-75' 
                      : 'border-l-green-600'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="sm:w-1/3 md:w-1/4 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={event.eventThumbnail || 'https://via.placeholder.com/300'}
                        alt={event.eventTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isPast 
                                ? 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400' 
                                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            }`}>
                              {isPast ? 'Past Event' : 'Upcoming'}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                            {event.eventTitle}
                          </h3>

                          <div className="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-primary text-lg" />
                              <span className="font-medium">
                                {eventDate.toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-primary text-lg" />
                              <span className="font-medium">{event.eventLocation}</span>
                            </div>
                          </div>

                          {isPast && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              This event has already taken place. Thank you for participating!
                            </p>
                          )}
                        </div>

                        {/* Action Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRemoveEvent(event._id)}
                          className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px] touch-manipulation"
                        >
                          Remove
                          <FaArrowRight className="rotate-180" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedEvents;