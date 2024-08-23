import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendationForm.css';
import img from "../../assets/image.png";

const RecommendationForm = () => {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        weight: '',
        height: '',
        veg_or_nonveg: '',
        disease: '',
        region: '',
        allergics: '',
        foodtype: ''
    });

    const navigate = useNavigate(); // Use useNavigate for programmatic navigation

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8081/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            navigate('/recommendations', { state: { result: data } }); // Redirect to Recommendations page with data
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="background">
                <img src={img} alt="Background" className="image" />
            </div>
            <h1>Get Personalized Diet & Workout Plans</h1>
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="weight">Weight (kg)</label>
                            <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="height">Height (cm)</label>
                            <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="veg_or_nonveg">Diet Preference</label>
                            <select id="veg_or_nonveg" name="veg_or_nonveg" value={formData.veg_or_nonveg} onChange={handleChange} required>
                                <option value="">Select Diet</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="disease">Any Diseases</label>
                            <input type="text" id="disease" name="disease" value={formData.disease} onChange={handleChange} placeholder="e.g., Diabetes" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="region">Region</label>
                            <input type="text" id="region" name="region" value={formData.region} onChange={handleChange} placeholder="e.g., Europe, Asia" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="allergics">Allergics</label>
                            <input type="text" id="allergics" name="allergics" value={formData.allergics} onChange={handleChange} placeholder="e.g., Nuts, Dairy" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="foodtype">Food Type Preference</label>
                            <input type="text" id="foodtype" name="foodtype" value={formData.foodtype} onChange={handleChange} placeholder="e.g., Organic, Low-carb" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn-submit">Get Recommendations</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecommendationForm;
