import { CalculateEcoScoreDto } from '../dtos/calculate-score.dto';

export class DurabilityService {
  /**
   * Evaluates Durability Score (15% weight)
   * Weights internally: 40% lifespan, 30% repairability, 20% warranty, 10% reuse cycles
   */
  static calculate(dto: CalculateEcoScoreDto): { score: number; explanations: string[] } {
    let score = 0;
    const explanations: string[] = [];

    // Lifespan (max 40 pts) - Assuming 10 years is optimal max score
    const lifespanScore = Math.min((dto.lifespanYears / 10) * 40, 40);
    score += lifespanScore;
    if (lifespanScore >= 30) explanations.push(`Score increased for excellent expected lifespan (${dto.lifespanYears} years).`);

    // Repairability (max 30 pts)
    if (dto.repairable) {
      score += 30;
      explanations.push('Score increased because the product is designed for repairability.');
    } else {
      explanations.push('Score reduced because the product cannot be easily repaired.');
    }

    // Warranty (max 20 pts) - Assuming 5 years is optimal max score
    const warrantyScore = Math.min((dto.warrantyYears / 5) * 20, 20);
    score += warrantyScore;
    if (warrantyScore >= 15) explanations.push(`Score increased due to strong warranty backing (${dto.warrantyYears} years).`);

    // Reuse cycles (max 10 pts) - Assuming 100 cycles is optimal max
    const reuseScore = Math.min((dto.reuseCycles / 100) * 10, 10);
    score += reuseScore;

    score = Math.max(0, Math.min(100, score));

    return { score, explanations };
  }
}
