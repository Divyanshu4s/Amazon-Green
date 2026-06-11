import { CalculateEcoScoreDto } from '../dtos/calculate-score.dto';
import { MaterialScoringService } from './material-scoring.service';
import { UserImpactService } from './user-impact.service';
import { DurabilityService } from './durability.service';
import { PackagingService } from './packaging.service';
import { LocalityScoreService } from './locality.service';
import { RuleBasedEcoScoreEngine } from './rule-engine.service';
import { EcoGrade } from '../enums/ecoscore.enum';

export interface EcoScoreResult {
  ecoScore: number;
  ecoGrade: EcoGrade;
  breakdown: {
    material: number;
    userImpact: number;
    durability: number;
    packaging: number;
    locality: number;
  };
  explanations: string[];
}

export class EcoScoreService {
  static calculateScore(dto: CalculateEcoScoreDto): EcoScoreResult {
    const material = MaterialScoringService.calculate(dto);
    const userImpact = UserImpactService.calculate(dto);
    const durability = DurabilityService.calculate(dto);
    const packaging = PackagingService.calculate(dto);
    const locality = LocalityScoreService.calculate(dto);

    // Apply weights
    const baseScore = 
      (material.score * 0.45) +
      (userImpact.score * 0.25) +
      (durability.score * 0.15) +
      (packaging.score * 0.10) +
      (locality.score * 0.05);

    // Apply JSON Rule Engine Modifiers
    const rules = RuleBasedEcoScoreEngine.applyRules(dto.tags);
    let finalScore = baseScore + rules.scoreModifier;

    // Bound to 0-100
    finalScore = Math.max(0, Math.min(100, Math.round(finalScore)));

    // Aggregate explanations
    const explanations = [
      ...material.explanations,
      ...userImpact.explanations,
      ...durability.explanations,
      ...packaging.explanations,
      ...locality.explanations,
      ...rules.explanations
    ];

    return {
      ecoScore: finalScore,
      ecoGrade: this.determineGrade(finalScore),
      breakdown: {
        material: Math.round(material.score),
        userImpact: Math.round(userImpact.score),
        durability: Math.round(durability.score),
        packaging: Math.round(packaging.score),
        locality: Math.round(locality.score),
      },
      explanations
    };
  }

  private static determineGrade(score: number): EcoGrade {
    if (score >= 90) return EcoGrade.A_PLUS;
    if (score >= 80) return EcoGrade.A;
    if (score >= 70) return EcoGrade.B;
    if (score >= 60) return EcoGrade.C;
    if (score >= 40) return EcoGrade.D;
    return EcoGrade.F;
  }
}
