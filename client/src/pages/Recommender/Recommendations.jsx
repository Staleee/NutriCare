import React from 'react';
import { useLocation } from 'react-router-dom';
import './Recommendations.css';
import img from "../../assets/image.png";

const Recommendations = () => {
    const location = useLocation();
    const { result } = location.state || {}; 

    if (!result) {
        return <p>No recommendations available. Please submit the form first.</p>;
    }

    return (
        <div className="recommendations-container">
            <div className="background">
                <img src={img} alt="Background" className="image" />
            </div>
            <h1>Personalized Recommendations</h1>
            <div className="recs">
                {result.error ? (
                    <p>{result.error}</p>
                ) : (
                    <>
                        <div className="recommendation-category">
                            <h3>Breakfast:</h3>
                            <ul>
                                {result.breakfast.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                        <div className="recommendation-category">
                            <h3>Lunch:</h3>
                            <ul>
                                {result.lunch.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                        <div className="recommendation-category">
                            <h3>Dinners:</h3>
                            <ul>
                                {result.dinners.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                        <div className="recommendation-category">
                            <h3>Workouts:</h3>
                            <ul>
                                {result.workouts.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
