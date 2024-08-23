import React, { useState } from 'react';
import './RecommendationForm.css';

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

    const [result, setResult] = useState(null);

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
            setResult(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1>Get Personalized Diet & Workout Plans</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select className="form-control" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="weight" className="form-label">Weight (kg)</label>
                    <input type="number" className="form-control" id="weight" name="weight" value={formData.weight} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="height" className="form-label">Height (cm)</label>
                    <input type="number" className="form-control" id="height" name="height" value={formData.height} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="veg_or_nonveg" className="form-label">Diet Preference</label>
                    <select className="form-control" id="veg_or_nonveg" name="veg_or_nonveg" value={formData.veg_or_nonveg} onChange={handleChange} required>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="disease" className="form-label">Any Diseases</label>
                    <input type="text" className="form-control" id="disease" name="disease" value={formData.disease} onChange={handleChange} placeholder="e.g., Diabetes" />
                </div>
                <div className="mb-3">
                    <label htmlFor="region" className="form-label">Region</label>
                    <input type="text" className="form-control" id="region" name="region" value={formData.region} onChange={handleChange} placeholder="e.g., Europe, Asia" />
                </div>
                <div className="mb-3">
                    <label htmlFor="allergics" className="form-label">Allergics</label>
                    <input type="text" className="form-control" id="allergics" name="allergics" value={formData.allergics} onChange={handleChange} placeholder="e.g., Nuts, Dairy" />
                </div>
                <div className="mb-3">
                    <label htmlFor="foodtype" className="form-label">Food Type Preference</label>
                    <input type="text" className="form-control" id="foodtype" name="foodtype" value={formData.foodtype} onChange={handleChange} placeholder="e.g., Organic, Low-carb" />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-lg">Get Recommendations</button>
                </div>
            </form>
            {result && (
                <div id="result" className="mt-4">
                    <h3>Recommendations</h3>
                    {result.error ? (
                        <p>{result.error}</p>
                    ) : (
                        <>
                            <h4>Breakfast:</h4>
                            <ul>
                                {result.breakfast.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                            <h4>Dinners:</h4>
                            <ul>
                                {result.dinners.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                            <h4>Workouts:</h4>
                            <ul>
                                {result.workouts.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecommendationForm;