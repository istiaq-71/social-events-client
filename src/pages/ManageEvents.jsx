import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCalendarAlt, FaMapMarkerAlt, FaTag, FaImage, FaHeading, FaFileAlt } from 'react-icons/fa';
import CustomDatePicker from '../components/CustomDatePicker';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const ManageEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const eventTypes = ['Cleanup', 'Plantation', 'Donation', 'Education', 'Healthcare', 'Other'];

  useEffect(() => {
    fetchMyEvents();
  }, [user]);

  const fetchMyEvents = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(
        `${apiUrl}/api/my-events/${user.email}`
      );
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent({
      ...event,
      eventDate: event.eventDate
    });
    setSelectedDate(new Date(event.eventDate));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      toast.error('Please select an event date');
      return;
    }

    const updatedEvent = {
      ...editingEvent,
      eventDate: selectedDate.toISOString().split('T')[0]
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(
        `${apiUrl}/api/events/${editingEvent._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedEvent)
        }
      );

      if (response.ok) {
        toast.success('Event updated successfully!');
        setEditingEvent(null);
        fetchMyEvents();
      } else {
        toast.error('Failed to update event');
      }
    } catch (error) {
      toast.error('Error updating event');
    }
  };

  const handleDelete = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(
        `${apiUrl}/api/events/${eventId}`,
        {
          method: 'DELETE'
        }
      );

      if (response.ok) {
        toast.success('Event deleted successfully!');
        fetchMyEvents();
      } else {
        toast.error('Failed to delete event');
      }
    } catch (error) {
      toast.error('Error deleting event');
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
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block mb-4"
          >
            <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              📋 Event Management
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Manage My Events
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Edit, update, or delete your created events
          </p>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-xl"
          >
            <div className="text-6xl mb-4">📅</div>
            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No events created yet</p>
            <p className="text-gray-500 dark:text-gray-400">Start creating events to make an impact!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-slate-700/50 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {event.eventType}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-green-500" />
                      <span className="text-sm font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />
                      <span className="text-sm font-medium">
                        {new Date(event.eventDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(event)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold"
                    >
                      <FaEdit /> Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold"
                    >
                      <FaTrash /> Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setEditingEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/50 dark:border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Edit Event
                </h2>
                <button
                  onClick={() => setEditingEvent(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaHeading className="text-primary" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaFileAlt className="text-primary" />
                    Description
                  </label>
                  <textarea
                    value={editingEvent.description}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, description: e.target.value })
                    }
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaTag className="text-primary" />
                    Event Type
                  </label>
                  <select
                    value={editingEvent.eventType}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, eventType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 cursor-pointer"
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaImage className="text-primary" />
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    value={editingEvent.thumbnailUrl}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, thumbnailUrl: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingEvent.location}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, location: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    Event Date
                  </label>
                  <CustomDatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={new Date()}
                    placeholder="Select event date"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:shadow-lg transition-all font-bold text-lg"
                  >
                    ✨ Update Event
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="flex-1 bg-gray-500 text-white py-4 rounded-xl hover:bg-gray-600 transition-all font-semibold"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;