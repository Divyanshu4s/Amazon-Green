from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
import os
import sys

# Append parent dir
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from training.feature_engineering import FeatureEngineer
from explainability.explain import Explainer
from utils.hybrid_score import calculate_hybrid_score, calculate_confidence, get_grade

app = FastAPI(title="EcoCart ML Sustainability Predictor")

# Load Models
MODEL_DIR = '../models/v1/'
try:
    model = joblib.load(os.path.join(MODEL_DIR, 'best_model.pkl'))
    fe = FeatureEngineer()
    fe.load_processors(MODEL_DIR)
    explainer = Explainer(model)
except Exception as e:
    print(f"Warning: Model not loaded. Ensure you run train.py first. Error: {e}")
    model = None

class ProductData(BaseModel):
    category: str
    material_type: str
    recycled_content_percent: float
    recyclable: int
    reusable: int
    repairable: int
    lifespan_years: float
    warranty_years: float
    reuse_cycles: int
    packaging_type: str
    plastic_percentage: float
    shipping_distance: float
    energy_saving: int
    water_saving: int
    waste_reduction: int
    seller_score: float

class PredictRequest(BaseModel):
    rule_score: float
    product_data: ProductData

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

@app.post("/predict")
def predict_score(req: PredictRequest):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not initialized")

    # Convert to DataFrame
    data_dict = req.product_data.dict()
    df_original = pd.DataFrame([data_dict])

    # Count missing/default fields for confidence
    # Assuming 0 implies not provided for some numericals, or just using a basic heuristic
    missing_count = sum([1 for v in data_dict.values() if v == 0 or v == "Unknown"])
    
    try:
        # 1. Transform
        df_processed = fe.transform(df_original)

        # 2. Predict ML Score
        ml_score_pred = model.predict(df_processed)[0]

        # 3. Explain
        explanation = explainer.explain_prediction(df_processed, df_original)[0]

        # 4. Hybrid Score & Grades
        final_score = calculate_hybrid_score(req.rule_score, ml_score_pred)
        grade = get_grade(final_score)
        confidence = calculate_confidence(missing_count, len(data_dict))

        return {
            "predicted_score": final_score,
            "ml_base_score": round(ml_score_pred, 2),
            "rule_base_score": req.rule_score,
            "confidence": confidence,
            "grade": grade,
            "explanation": explanation
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
