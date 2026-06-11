import axios from 'axios';
import { AppError } from '../../../utils/AppError';

interface MLPredictionResponse {
  predicted_score: number;
  ml_base_score: number;
  rule_base_score: number;
  confidence: number;
  grade: string;
  explanation: string;
}

export class MLIntegrationService {
  private static ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

  /**
   * Calls the Python FastAPI ML Service to predict the sustainability score.
   * Gracefully falls back to the Rule Score if the ML service is unreachable.
   */
  static async predictScore(ruleScore: number, productData: any): Promise<MLPredictionResponse> {
    try {
      const payload = {
        rule_score: ruleScore,
        product_data: productData,
      };

      const response = await axios.post<MLPredictionResponse>(`${this.ML_SERVICE_URL}/predict`, payload, {
        timeout: 5000, // 5 second timeout so we don't hang requests
      });

      return response.data;
    } catch (error: any) {
      console.warn(`[ML Service Warning] Failed to reach ML Predictor: ${error.message}. Falling back to Pure Rule Engine.`);
      
      // Fallback
      return {
        predicted_score: ruleScore,
        ml_base_score: 0,
        rule_base_score: ruleScore,
        confidence: 0, // 0 confidence indicates ML wasn't used
        grade: this.fallbackGrade(ruleScore),
        explanation: 'ML Prediction unavailable. Falling back to pure rule-based score.',
      };
    }
  }

  private static fallbackGrade(score: number): string {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 40) return 'D';
    return 'F';
  }
}
