# 🏠 Real Estate Customer Onboarding Form

A full-stack web application for collecting customer inquiries in the real estate domain. Users can fill out their personal details, preferred property type, budget, and choose a location using an interactive map.

---

## ✨ Features

- 📄 Customer onboarding form with full name, email, mobile, etc.
- 🗺️ Location selection using Leaflet and OpenStreetMap
- 📦 Data stored in MongoDB (via Mongoose)
- ✅ Thank-you confirmation page
- 💅 Responsive and modern UI with Tailwind CSS

---

## 📁 Project Structure

m3i/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── OnboardingForm.js
│ │ │ └── Thankyou.js
│ │ ├── App.js
│ │ └── index.js
├── server/ # Express backend
│ ├── models/
│ │ └── Onboarding.js
│ ├── routes/
│ │ └── onboard.js
│ ├── server.js
│ └── .env


---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js & npm
- MongoDB Atlas (or local MongoDB)
- Git

---

### 🚀 Getting Started

#### 1. Clone the repo

### ```bash
git clone https://github.com/nehanil31/Customer-Onboarding-Form
cd Customer-Onboarding-Form

## Create a .env file inside /server:
    MONGO_URI=your_mongodb_connection_string
    EMAIL_USER=your-mail@gmail.com
    EMAIL_PASS=password



### Backend Setup (Node.js + Express)
    cd server
    npm install
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    npm install nodemailer
    node server.js
### Frondend Setup(React + Tailwind CSS)
    cd client
    npm install
    npm install leaflet react-leaflet
    npm install lucide-react
    npm start


### 🧩 Technologies Used
Frontend: React, Tailwind CSS, Leaflet, Axios

Backend: Node.js, Express, Mongoose

Database: MongoDB Atlas

Map: OpenStreetMap + Leaflet.js    

## 📝 Notes
The map uses Leaflet with OpenStreetMap – no API key required.

Form submission stores data in MongoDB, including geolocation (lat/lng + address name).

No email functionality like Nodemailer is used (by design).

         




