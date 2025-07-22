const mongoose = require("mongoose");

const OnboardingSchema = new mongoose.Schema({
  fullName: String,
  mobile: String,
  email: String,
  propertyType: String,
  budget: String,
  message: String,
  preferredLocation: {
  lat: Number,
  lng: Number,
  name: String,
},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Onboarding", OnboardingSchema);
