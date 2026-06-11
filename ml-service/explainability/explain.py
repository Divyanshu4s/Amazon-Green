# pyrefly: ignore [missing-import]
import shap
import pandas as pd
import numpy as np

class Explainer:
    def __init__(self, model):
        # TreeExplainer is fast for RF, XGBoost, and GBM
        self.explainer = shap.TreeExplainer(model)

    def explain_prediction(self, transformed_df, original_df):
        """
        Returns human-readable text explaining the top factors pushing the score up or down.
        """
        shap_values = self.explainer.shap_values(transformed_df)
        
        explanations = []
        for idx in range(len(transformed_df)):
            instance_shap = shap_values[idx]
            # Get indices of top 3 most impactful features (absolute value)
            top_indices = np.argsort(np.abs(instance_shap))[-3:][::-1]
            
            features = transformed_df.columns
            
            explanation_lines = []
            for i in top_indices:
                feat_name = features[i]
                orig_val = original_df.iloc[idx][feat_name]
                impact = instance_shap[i]
                
                direction = "increased" if impact > 0 else "reduced"
                explanation_lines.append(f"- {feat_name} = {orig_val} ({direction} score)")
                
            explanations.append("EcoScore prediction influenced heavily because:\n" + "\n".join(explanation_lines))
            
        return explanations
