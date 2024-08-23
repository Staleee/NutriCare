from flask import Flask, request, jsonify
import google.generativeai as genai
from google.oauth2 import service_account
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.environ["API_KEY"])

model = genai.GenerativeModel('gemini-1.5-flash')

def get_gemini_recommendations(prompt):
    try:
        response = model.generate_content(prompt)
        if response and hasattr(response, 'text'):
            return response.text.strip()
        else:
            return "No recommendations found."
    except Exception as e:
        print(f"Error getting recommendations: {e}")
        return "Error processing request."

@app.route('/recommend', methods=['POST'])
def recommend():
    if request.method == 'POST':
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        try:
            age = data.get('age')
            gender = data.get('gender')
            weight = data.get('weight')
            height = data.get('height')
            veg_or_nonveg = data.get('veg_or_nonveg')
            disease = data.get('disease')
            region = data.get('region')
            allergics = data.get('allergics')
            foodtype = data.get('foodtype')

            if any(v is None for v in [age, gender, weight, height, veg_or_nonveg, disease, region, allergics, foodtype]):
                return jsonify({"error": "Missing required fields"}), 400

            #prompt for Gemini API
            prompt = (
                f"Given the following details:\n"
                f"Age: {age}\n"
                f"Gender: {gender}\n"
                f"Weight: {weight}\n"
                f"Height: {height}\n"
                f"Diet Preference: {veg_or_nonveg}\n"
                f"Disease: {disease}\n"
                f"Region: {region}\n"
                f"Allergics: {allergics}\n"
                f"Food Type Preference: {foodtype}\n\n"
                "Recommend breakfast options, lunch options, dinner options, and workout plans to best fit my needs, without any additional tips or comments."
            )

            recommendations = get_gemini_recommendations(prompt)

            lines = recommendations.split("\n")
            breakfast = []
            lunch = []
            dinners = []
            workouts = []
            current_section = None

            for line in lines:
                if "breakfast" in line.lower():
                    current_section = "breakfast"
                elif "lunch" in line.lower():
                    current_section = "lunch"
                elif "dinner" in line.lower():
                    current_section = "dinners"
                elif "workout" in line.lower():
                    current_section = "workouts"
                elif current_section:
                    if current_section == "breakfast":
                        breakfast.append(line)
                    elif current_section == "lunch":
                        lunch.append(line)
                    elif current_section == "dinners":
                        dinners.append(line)
                    elif current_section == "workouts":
                        workouts.append(line)

            return jsonify({"breakfast": breakfast, "lunch": lunch, "dinners": dinners, "workouts": workouts})
        
        except Exception as e:
            return jsonify({"error": f"Error processing request: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8081)
