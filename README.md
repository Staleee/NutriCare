![NutriCare Logo](https://github.com/Staleee/NutriCare/blob/main/client/src/assets/v1112_32.png)

# Diet Recommendation System
---

## Overview

NutriCare is an innovative web application designed to deliver personalized meal and workout recommendations. It offers tailored suggestions for breakfast, lunch, and dinner, all while ensuring secure user authentication. With NutriCare, users receive customized guidance to support their health and wellness goals.

## Features

- **Secure Authentication:** Register and log in securely.
- **Personalized Recommendations:** Get customized breakfast, lunch, dinner, and workout recommendations.
- **User-Specific Inputs:** Recommendations are tailored based on age, gender, weight, height, dietary preferences, diseases, and allergies.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js (Express)
- **Machine Learning Model:**  Python (Flask) using Google Gemini

## Getting Started

### Prerequisites

- Python 3.x
- Node.js and npm
- Google Cloud API Key (for Google Gemini)
- Flask
- Flask-CORS
- React

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/nutricare.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd nutricare
    ```

### 3. **Set Up the Backend Environment:**

   - **For the Flask Backend:**
     ```bash
     cd model
     pip install -r requirements.txt
     ```

   - **Start the Flask Server:**
     ```bash
     python app.py
     ```
     The Flask server should be running on port 8081.

   - **For the Node.js Backend:**
     ```bash
     cd server
     npm install
     ```

   - **Start the Node.js Server:**
     ```bash
     nodemon index.js
     ```
     The Node.js server should be running on port 8000 (or any other port specified in the `.env` file).

4. **Frontend Setup:**

   - **Navigate to the Client Directory:**
     ```bash
     cd client
     ```

   - **Install the Required Node.js Packages:**
     ```bash
     npm install
     ```

   - **Start the React Development Server:**
     ```bash
     npm run dev
     ```

### 5. **Configuration and Environment Variables:**

   - **Flask Backend:**
     - Ensure you have the `API_KEY` environment variable set for Google Gemini.

   - **Node.js Backend:**
     - Set the `MONGO_URL` environment variable for the MongoDB connection string.
     - Configure the `PORT` environment variable for the server port.

  
