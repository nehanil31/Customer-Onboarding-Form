import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react'; // Optional: lucide icon

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full border">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">Thank You!</h1>
        <p className="text-gray-700 text-lg mb-6">Your form has been submitted successfully. Our team will contact you shortly.</p>
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
