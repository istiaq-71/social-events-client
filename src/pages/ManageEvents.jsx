import { useState, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCalendarAlt, FaMapMarkerAlt, FaTag, FaImage, FaHeading, FaFileAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const ManageEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});

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
    setErrors({});
  };

  const validateUpdateForm = () => {
    const newErrors = {};

    if (!editingEvent.title || !editingEvent.title.trim()) {
      newErrors.title = 'Event title is required';
    } else if (editingEvent.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!editingEvent.description || !editingEvent.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (editingEvent.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!editingEvent.eventType) {
      newErrors.eventType = 'Event type is required';
    }

    if (!editingEvent.thumbnailUrl || !editingEvent.thumbnailUrl.trim()) {
      newErrors.thumbnailUrl = 'Thumbnail URL is required';
    } else {
      try {
        new URL(editingEvent.thumbnailUrl);
      } catch {
        newErrors.thumbnailUrl = 'Please enter a valid URL';
      }
    }

    if (!editingEvent.location || !editingEvent.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (editingEvent.location.trim().length < 3) {
      newErrors.location = 'Location must be at least 3 characters';
    }

    if (!selectedDate) {
      newErrors.date = 'Event date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = 'Event date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateUpdateForm()) {
      toast.error('Please fix the errors in the form');
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
        setErrors({});
        fetchMyEvents();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update event');
      }
    } catch (error) {
      toast.error('Error updating event');
    }
  };

  const handleDelete = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event? This will also remove all users who joined this event.')) {
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

      const data = await response.json();

      if (response.ok) {
        toast.success('Event deleted successfully!');
        fetchMyEvents();
      } else {
        toast.error(data.message || 'Failed to delete event');
        console.error('Delete error:', data);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event. Please try again.');
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
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block mb-3 sm:mb-4"
          >
            <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              📋 Event Management
            </span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent px-2">
            Manage My Events
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg px-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
            onClick={() => setEditingEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-gray-200/50 dark:border-slate-700/50"
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
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) => {
                      setEditingEvent({ ...editingEvent, title: e.target.value });
                      if (errors.title) {
                        setErrors({ ...errors, title: '' });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                      errors.title
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                    } dark:bg-slate-800/50`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaFileAlt className="text-primary" />
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={editingEvent.description}
                    onChange={(e) => {
                      setEditingEvent({ ...editingEvent, description: e.target.value });
                      if (errors.description) {
                        setErrors({ ...errors, description: '' });
                      }
                    }}
                    rows="5"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none resize-none ${
                      errors.description
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                    } dark:bg-slate-800/50`}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaTag className="text-primary" />
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editingEvent.eventType}
                    onChange={(e) => {
                      setEditingEvent({ ...editingEvent, eventType: e.target.value });
                      if (errors.eventType) {
                        setErrors({ ...errors, eventType: '' });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none cursor-pointer ${
                      errors.eventType
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                    } dark:bg-slate-800/50`}
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.eventType && <p className="text-red-500 text-sm mt-2">{errors.eventType}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaImage className="text-primary" />
                    Thumbnail URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={editingEvent.thumbnailUrl}
                    onChange={(e) => {
                      setEditingEvent({ ...editingEvent, thumbnailUrl: e.target.value });
                      if (errors.thumbnailUrl) {
                        setErrors({ ...errors, thumbnailUrl: '' });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                      errors.thumbnailUrl
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                    } dark:bg-slate-800/50`}
                  />
                  {errors.thumbnailUrl && <p className="text-red-500 text-sm mt-2">{errors.thumbnailUrl}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editingEvent.location}
                    onChange={(e) => {
                      setEditingEvent({ ...editingEvent, location: e.target.value });
                      if (errors.location) {
                        setErrors({ ...errors, location: '' });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                      errors.location
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                    } dark:bg-slate-800/50`}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      if (errors.date) {
                        setErrors({ ...errors, date: '' });
                      }
                    }}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select event date"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none ${
                      errors.date
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                    } dark:bg-slate-800/50 dark:text-white`}
                    wrapperClassName="w-full"
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
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