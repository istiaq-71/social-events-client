import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import CustomDatePicker from '../components/CustomDatePicker';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaMapMarkerAlt, FaImage, FaHeading, FaFileAlt, FaTag } from 'react-icons/fa';

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: '',
    thumbnailUrl: '',
    location: ''
  });

  const eventTypes = ['Cleanup', 'Plantation', 'Donation', 'Education', 'Healthcare', 'Other'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Event type is required';
    }

    if (!formData.thumbnailUrl.trim()) {
      newErrors.thumbnailUrl = 'Thumbnail URL is required';
    } else {
      try {
        new URL(formData.thumbnailUrl);
      } catch {
        newErrors.thumbnailUrl = 'Please enter a valid URL';
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.trim().length < 3) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to create an event');
      navigate('/login');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const eventData = {
      ...formData,
      eventDate: selectedDate.toISOString().split('T')[0],
      creatorEmail: user.email,
      creatorName: user.displayName || user.email
    };

    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('Creating event with API URL:', apiUrl);
      console.log('Event data:', eventData);
      
      const endpoints = [
        `${apiUrl}/api/events`,
        `${apiUrl}/events`,
        `${apiUrl}/event`
      ];

      let success = false;
      let lastError = null;

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
          });

          const data = await response.json();
          console.log('API Response:', data);

          if (response.ok) {
            toast.success('Event created successfully! 🎉');
            navigate('/upcoming-events');
            success = true;
            break;
          }
        } catch (error) {
          lastError = error;
          console.log(`Endpoint ${endpoint} failed:`, error.message);
        }
      }

      if (!success) {
        toast.error('Error creating event. Check console for details.');
        console.error('All endpoints failed');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
      toast.error('Error creating event. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Create an <span className="text-green-600 dark:text-green-400">Event</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Organize a social development event and make a positive impact in your community
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaHeading className="text-green-600" />
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.title
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                } dark:bg-slate-700 dark:text-white`}
                placeholder="e.g., Road Cleaning in Mirpur 10, Dhaka"
              />
              {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaFileAlt className="text-green-600" />
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.description
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                } dark:bg-slate-700 dark:text-white resize-none`}
                placeholder="Describe your event in detail..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaTag className="text-green-600" />
                Event Type <span className="text-red-500">*</span>
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.eventType
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                } dark:bg-slate-700 dark:text-white`}
              >
                <option value="">Select event type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.eventType && <p className="text-red-500 text-sm mt-2">{errors.eventType}</p>}
            </div>

            {/* Thumbnail URL */}
            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaImage className="text-green-600" />
                Thumbnail Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.thumbnailUrl
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                } dark:bg-slate-700 dark:text-white`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.thumbnailUrl && <p className="text-red-500 text-sm mt-2">{errors.thumbnailUrl}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-green-600" />
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.location
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 dark:border-slate-600 focus:border-green-500 dark:focus:border-green-500'
                } dark:bg-slate-700 dark:text-white`}
                placeholder="e.g., Mirpur 10, Dhaka"
              />
              {errors.location && <p className="text-red-500 text-sm mt-2">{errors.location}</p>}
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaCalendarAlt className="text-green-600" />
                Event Date <span className="text-red-500">*</span>
              </label>
              <CustomDatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  if (errors.date) {
                    setErrors({ ...errors, date: '' });
                  }
                }}
                minDate={new Date()}
                placeholder="Select event date"
              />
              {errors.date && <p className="text-red-500 text-sm mt-2">{errors.date}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isLoading ? 'Creating Event...' : 'Create Event'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateEvent;
