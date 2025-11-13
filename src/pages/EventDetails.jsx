import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${id}`);
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfJoined = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/check-join/${id}/${user.email}`
      );
      const data = await response.json();
      setHasJoined(data.joined);
    } catch (error) {
      console.error('Error checking join status:', error);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/join-event`, {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
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
    <div className="min-h-screen py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden"
      >
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          className="w-full h-96 object-cover"
        />
        
        <div className="p-8">
          <div className="mb-4">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              {event.eventType}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <FaCalendarAlt className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">{new Date(event.eventDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <FaMapMarkerAlt className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{event.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <FaUser className="text-primary text-xl" />
              <div>
                <p className="text-sm text-gray-500">Organizer</p>
                <p className="font-semibold">{event.creatorName}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3">Description</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {hasJoined ? (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-6 py-4 rounded-lg text-center font-semibold">
              You have already joined this event
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleJoinEvent}
              disabled={joining}
              className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {joining ? 'Joining...' : 'Join Event'}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetails;