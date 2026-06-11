import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os
import sys

# Add parent dir to path to import feature_engineering
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from training.feature_engineering import FeatureEngineer

def evaluate():
    model_dir = '../models/v1/'
    data_path = '../data/sample_data.csv'

    try:
        model = joblib.load(os.path.join(model_dir, 'best_model.pkl'))
        fe = FeatureEngineer()
        fe.load_processors(model_dir)
    except FileNotFoundError:
        print("Model or processors not found. Please run train.py first.")
        return

    df = pd.read_csv(data_path)
    X = df.drop(columns=['product_name', 'eco_score'])
    y = df['eco_score']

    X_processed = fe.transform(X)
    preds = model.predict(X_processed)

    r2 = r2_score(y, preds)
    mae = mean_absolute_error(y, preds)
    rmse = mean_squared_error(y, preds, squared=False)

    print("\n--- Evaluation Report ---")
    print(f"R² Score : {r2:.4f}")
    print(f"MAE      : {mae:.4f}")
    print(f"RMSE     : {rmse:.4f}")

if __name__ == "__main__":
    evaluate()
