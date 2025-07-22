const express = require('express');
const router = express.Router();
const Onboarding = require('../models/Onboarding');
const nodemailer = require('nodemailer');

// POST: /onboard
router.post('/onboard', async (req, res) => {
  try {
    const newEntry = new Onboarding(req.body);
    await newEntry.save();

    // Email config
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,         // Your email (set in .env)
        pass: process.env.EMAIL_PASS,         // App password
      },
    });

    // Compose email
    const mailOptions = {
      from: `"AI Realty Space" <${process.env.EMAIL_USER}>`,
      to: req.body.email, // recipient
      subject: 'Thank you for your interest!',
      html: `
        <h2>Thank you, ${req.body.fullName}!</h2>
        <p>We’ve received your details. One of our representatives will get in touch soon.</p>
        <p><b>Submitted Info:</b></p>
        <ul>
          <li>Mobile: ${req.body.mobile}</li>
          <li>Email: ${req.body.email}</li>
          <li>Property Type: ${req.body.propertyType}</li>
          <li>Budget: ${req.body.budget}</li>
        </ul>
        <p>Preferred Location: ${
          req.body.preferredLocation
            ? `${req.body.preferredLocation.name}`
            : 'Not specified'
        }</p>
        <p>Thanks for choosing AI Realty Space.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Form submitted and email sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
