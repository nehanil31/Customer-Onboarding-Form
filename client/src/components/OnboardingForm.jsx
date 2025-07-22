import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function LocationSelector({ setPreferredLocation }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const locationName = data.display_name || 'Unknown location';
        setPreferredLocation({ lat, lng, name: locationName });
      } catch (error) {
        console.error('Reverse geocoding failed:', error);
        setPreferredLocation({ lat, lng, name: 'Unknown location' });
      }
    },
  });
  return null;
}

export default function OnboardingForm() {
  const navigate = useNavigate();
  const [preferredLocation, setPreferredLocation] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    propertyType: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const propertyOptions = ['Apartment', 'Plot', 'Commercial', 'Villa', 'Farmhouse'];

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.propertyType) newErrors.propertyType = 'Select a property type';
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!preferredLocation) newErrors.location = 'Please select your preferred location on the map';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:5000/api/onboard', {
        ...formData,
        preferredLocation,
      });
      navigate('/thank-you');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 relative">
      {/* Background Image Header */}
      <div className="relative h-64 bg-cover bg-center rounded-b-3xl shadow-xl" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1950&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-b-3xl flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-md">Find Your Dream Property</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto -mt-24 mb-12 bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-blue-200 z-10 relative">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">🏠 Customer Onboarding Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700 font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-gray-700 font-medium">Type of Property</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Property Type --</option>
              {propertyOptions.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
            {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-gray-700 font-medium">Budget (in ₹ Lakhs)</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium">Message / Comments</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full mt-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Map Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Preferred Location (Click on Map)</label>
            <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
              <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '300px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationSelector setPreferredLocation={setPreferredLocation} />
                {preferredLocation && (
                  <Marker position={[preferredLocation.lat, preferredLocation.lng]} />
                )}
              </MapContainer>
            </div>
            {preferredLocation && (
              <p className="mt-2 text-green-700 text-sm font-medium">
                📍 <strong>{preferredLocation.name}</strong>
              </p>
            )}
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
