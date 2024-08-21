import os
from flask import Flask, render_template, request, redirect, url_for
import google.generativeai as gemini

app = Flask(__name__)

# Set up the Gemini AI API key
gemini.configure(api_key='AIzaSyD_1ANPCdYRMdxFihtMwBxeovj5Nrcwn88')

def get_gemini_recommendations(age, gender, weight, height, veg_or_nonveg, disease, region, allergics, foodtype):
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
        "Recommend breakfast options, dinner options, and workout plans."
    )

    try:
        response = gemini.chat(prompt=prompt)
        print("Full Response:", response)  # Print the entire response for debugging
        
        # Extracting the response text if it exists
        if response and hasattr(response, 'candidates') and response.candidates:
            first_candidate = response.candidates[0]
            if isinstance(first_candidate, dict) and 'content' in first_candidate:
                recommendations = first_candidate['content']
                return recommendations.strip()
            else:
                print("Unexpected structure in first_candidate:", first_candidate)
                return None
        else:
            print("No candidates found in response.")
            return None

    except Exception as e:
        print(f"Error getting recommendations: {e}")
        return None


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['GET', 'POST'])
def recommend():
    if request.method == 'POST':
        # Retrieve form data
        age = request.form.get('age')
        gender = request.form.get('gender')
        weight = request.form.get('weight')
        height = request.form.get('height')
        veg_or_nonveg = request.form.get('veg_or_nonveg')
        disease = request.form.get('disease')
        region = request.form.get('region')
        allergics = request.form.get('allergics')
        foodtype = request.form.get('foodtype')

        # Get recommendations from Gemini AI
        recommendations = get_gemini_recommendations(age, gender, weight, height, veg_or_nonveg, disease, region, allergics, foodtype)

        # If recommendations are None, handle the error
        if not recommendations:
            return render_template('recommendations.html', breakfast=[], dinners=[], workouts=[])

        # Parse the recommendations into sections
        lines = recommendations.split("\n")
        breakfast = []
        dinners = []
        workouts = []
        current_section = None

        for line in lines:
            if "breakfast" in line.lower():
                current_section = "breakfast"
            elif "dinner" in line.lower():
                current_section = "dinners"
            elif "workout" in line.lower():
                current_section = "workouts"
            elif current_section:
                if current_section == "breakfast":
                    breakfast.append(line)
                elif current_section == "dinners":
                    dinners.append(line)
                elif current_section == "workouts":
                    workouts.append(line)

        return render_template('recommendations.html', breakfast=breakfast, dinners=dinners, workouts=workouts)

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, port=8081)
