import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib
import os

class FeatureEngineer:
    def __init__(self):
        self.label_encoders = {}
        self.scaler = StandardScaler()
        self.categorical_cols = ['category', 'material_type', 'packaging_type']
        self.numerical_cols = [
            'recycled_content_percent', 'lifespan_years', 'warranty_years',
            'reuse_cycles', 'plastic_percentage', 'shipping_distance', 'seller_score'
        ]

    def fit_transform(self, df):
        """Fits the encoders and scalers on the training data and transforms it."""
        df_processed = df.copy()

        # Handle Missing Values
        for col in self.numerical_cols:
            df_processed[col] = df_processed[col].fillna(df_processed[col].median())
        for col in self.categorical_cols:
            df_processed[col] = df_processed[col].fillna('Unknown')

        # Label Encoding for Categoricals
        for col in self.categorical_cols:
            le = LabelEncoder()
            df_processed[col] = le.fit_transform(df_processed[col])
            self.label_encoders[col] = le

        # Standard Scaling for Numericals
        df_processed[self.numerical_cols] = self.scaler.fit_transform(df_processed[self.numerical_cols])

        return df_processed

    def transform(self, df):
        """Transforms new inference data based on fitted encoders/scalers."""
        df_processed = df.copy()

        # Handle Missing Values
        for col in self.numerical_cols:
            # fill with 0 or a robust default for inference if missing
            if col in df_processed.columns:
                df_processed[col] = df_processed[col].fillna(0)
                
        for col in self.categorical_cols:
            if col in df_processed.columns:
                df_processed[col] = df_processed[col].fillna('Unknown')

        # Label Encoding
        for col in self.categorical_cols:
            if col in self.label_encoders:
                le = self.label_encoders[col]
                # Handle unseen labels by mapping them to an 'Unknown' class if necessary
                # For simplicity here, we assume inputs are known or catch errors
                try:
                    df_processed[col] = le.transform(df_processed[col])
                except ValueError:
                    df_processed[col] = 0 # Default to first class if unseen

        # Standard Scaling
        if set(self.numerical_cols).issubset(df_processed.columns):
            df_processed[self.numerical_cols] = self.scaler.transform(df_processed[self.numerical_cols])

        return df_processed

    def save_processors(self, path):
        os.makedirs(path, exist_ok=True)
        joblib.dump(self.label_encoders, os.path.join(path, 'label_encoders.pkl'))
        joblib.dump(self.scaler, os.path.join(path, 'scaler.pkl'))

    def load_processors(self, path):
        self.label_encoders = joblib.load(os.path.join(path, 'label_encoders.pkl'))
        self.scaler = joblib.load(os.path.join(path, 'scaler.pkl'))
