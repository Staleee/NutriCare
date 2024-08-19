from fastapi import FastAPI
from pydantic import BaseModel, conlist
from typing import List, Optional
import pandas as pd
from model import recommend,output_recommended_recipes

try:
    print("Loading dataset...")
    dataset = pd.read_csv('../Data/recipes.csv', encoding='utf-8')
    print("Dataset loaded successfully.")
except Exception as e:
    print(f"An error occurred: {e}")

app = FastAPI()

class Params(BaseModel):
    n_neighbors: int = 5
    return_distance: bool = False

class PredictionIn(BaseModel):
    nutrition_input: conlist(float, min_items=9, max_items=9) # type: ignore
    ingredients: List[str] = []
    params: Optional[Params] = None

class Recipe(BaseModel):
    Name: str
    CookTime: str
    PrepTime: str
    TotalTime: str
    RecipeIngredientParts: List[str]
    Calories: float
    FatContent: float
    SaturatedFatContent: float
    CholesterolContent: float
    SodiumContent: float
    CarbohydrateContent: float
    FiberContent: float
    SugarContent: float
    ProteinContent: float
    RecipeInstructions: List[str]

class PredictionOut(BaseModel):
    output: Optional[List[Recipe]] = None

@app.get("/")
def home():
    return {"health_check": "OK"}

@app.post("/predict/", response_model=PredictionOut)
def update_item(prediction_input: PredictionIn):
    recommendation_dataframe = recommend(
        dataset,
        prediction_input.nutrition_input,
        prediction_input.ingredients,
        prediction_input.params.dict() if prediction_input.params else {}
    )
    output = output_recommended_recipes(recommendation_dataframe)
    return {"output": output if output is not None else None}
