import { CalculateEcoScoreDto } from '../dtos/calculate-score.dto';

export class PackagingService {
  /**
   * Evaluates Packaging Score (10% weight)
   */
  static calculate(dto: CalculateEcoScoreDto): { score: number; explanations: string[] } {
    let score = 50; // Baseline
    const explanations: string[] = [];

    const packMat = dto.packagingMaterial.toLowerCase();
    
    if (packMat.includes('compostable')) {
      score += 40;
      explanations.push('Score increased significantly due to compostable packaging.');
    } else if (packMat.includes('recycled cardboard')) {
      score += 30;
      explanations.push('Score increased due to use of recycled cardboard packaging.');
    } else if (packMat.includes('plastic heavy') || packMat.includes('mixed')) {
      score -= 30;
      explanations.push('Score reduced because packaging contains heavy mixed plastics.');
    }

    if (dto.packagingRecyclable) {
      score += 10;
      explanations.push('Score increased because packaging is easily recyclable.');
    }

    if (dto.plasticPercentage > 50) {
      score -= (dto.plasticPercentage / 100) * 20;
      explanations.push(`Score reduced because packaging contains ${dto.plasticPercentage}% plastic.`);
    }

    if (dto.packagingEfficiency > 80) {
      score += 10;
      explanations.push('Score increased for high packaging efficiency (minimal empty space).');
    }

    score = Math.max(0, Math.min(100, score));

    return { score, explanations };
  }
}
