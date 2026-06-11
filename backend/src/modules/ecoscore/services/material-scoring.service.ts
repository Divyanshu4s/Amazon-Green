import { CalculateEcoScoreDto } from '../dtos/calculate-score.dto';

export class MaterialScoringService {
  /**
   * Evaluates Material Score (45% weight)
   */
  static calculate(dto: CalculateEcoScoreDto): { score: number; explanations: string[] } {
    let score = 50; // Base baseline
    const explanations: string[] = [];

    // Recycled content logic
    if (dto.recycledContentPercentage > 0) {
      score += (dto.recycledContentPercentage / 100) * 40;
      explanations.push(`Score increased because material contains ${dto.recycledContentPercentage}% recycled content.`);
    }

    // Material type baseline adjustments
    const matType = dto.materialType.toLowerCase();
    if (matType.includes('recycled metal')) {
      score += 20;
      explanations.push('Score increased due to use of highly recyclable metal.');
    } else if (matType.includes('bamboo') || matType.includes('organic cotton')) {
      score += 15;
      explanations.push('Score increased due to use of fast-renewing organic material.');
    } else if (matType.includes('single use plastic') || matType.includes('mixed plastic')) {
      score -= 30;
      explanations.push('Score heavily reduced due to single-use or mixed plastics.');
    }

    if (dto.renewableSource) {
      score += 10;
      explanations.push('Score increased for using renewable sources.');
    }

    if (dto.recyclability) {
      score += 10;
      explanations.push('Score increased because the material is recyclable at end of life.');
    }

    // Bound between 0 and 100
    score = Math.max(0, Math.min(100, score));

    return { score, explanations };
  }
}
