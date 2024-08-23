import React from 'react'
import backgroundImage from '/public/Group 1.png';
import "./Home.css"
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate(); // Import and use navigate here

  const handleButtonClick = () => {
    navigate('/RecommendationForm'); // Navigate to the specified route
  };
  
  return (
    <div>
      <div className="background-container">
        <section id="content">
          <p>
            <span className="highlight">
              <span className="green-text">Wellness</span> Starts<br></br> with Your Plate
            </span><br />
            Personalized Diets for Every Health Need
          </p>
          <button id="headerButton" onClick={handleButtonClick}>
            Start your journey
          </button>
        </section>
      </div>

      <section>

      </section>
    </div>
  )
}
