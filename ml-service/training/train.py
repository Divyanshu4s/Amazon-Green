import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
# pyrefly: ignore [missing-import]
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os
from feature_engineering import FeatureEngineer

def train_models():
    data_path = '../data/sample_data.csv'
    model_dir = '../models/v1/'
    
    # 1. Load Data
    df = pd.read_csv(data_path)
    
    # Remove identifiers
    X = df.drop(columns=['product_name', 'eco_score'])
    y = df['eco_score']

    # 2. Feature Engineering
    fe = FeatureEngineer()
    X_processed = fe.fit_transform(X)
    
    # Save processors
    fe.save_processors(model_dir)

    # 3. Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X_processed, y, test_size=0.2, random_state=42)

    # 4. Initialize Models
    models = {
        'RandomForest': RandomForestRegressor(random_state=42),
        'XGBoost': XGBRegressor(random_state=42),
        'GradientBoosting': GradientBoostingRegressor(random_state=42)
    }

    best_model = None
    best_score = -float('inf')
    best_name = ""
    results = []

    # 5. Train & Compare
    for name, model in models.items():
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        
        r2 = r2_score(y_test, preds)
        mae = mean_absolute_error(y_test, preds)
        rmse = mean_squared_error(y_test, preds, squared=False)
        
        results.append({
            'Model': name,
            'R2': r2,
            'MAE': mae,
            'RMSE': rmse
        })

        if r2 > best_score:
            best_score = r2
            best_model = model
            best_name = name

    # 6. Save Best Model
    os.makedirs(model_dir, exist_ok=True)
    joblib.dump(best_model, os.path.join(model_dir, 'best_model.pkl'))

    print(f"--- Training Complete ---")
    print(pd.DataFrame(results))
    print(f"\nBest Model Selected: {best_name} (R2: {best_score:.4f})")

if __name__ == "__main__":
    train_models()
