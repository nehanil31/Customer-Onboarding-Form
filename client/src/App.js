import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import OnboardingForm from "./components/OnboardingForm";
import Thankyou from './components/Thankyou';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingForm />} />
        <Route path="/Thank-you" element={<Thankyou />} />
      </Routes>
    </Router>
  );
}


export default App;
