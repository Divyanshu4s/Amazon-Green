import fs from 'fs';
import path from 'path';

export class RuleBasedEcoScoreEngine {
  private static rules: Record<string, number> | null = null;

  private static loadRules() {
    if (!this.rules) {
      const rulesPath = path.resolve(__dirname, '../config/rules.json');
      const data = fs.readFileSync(rulesPath, 'utf-8');
      this.rules = JSON.parse(data);
    }
    return this.rules!;
  }

  /**
   * Evaluates the tags array against the JSON rule engine and returns the modifier sum.
   */
  static applyRules(tags: string[]): { scoreModifier: number; explanations: string[] } {
    const rules = this.loadRules();
    let scoreModifier = 0;
    const explanations: string[] = [];

    tags.forEach(tag => {
      if (rules[tag] !== undefined) {
        const modifier = rules[tag];
        scoreModifier += modifier;
        const direction = modifier > 0 ? 'increased' : 'reduced';
        explanations.push(`Score ${direction} by ${Math.abs(modifier)} points due to tag: ${tag}.`);
      }
    });

    return { scoreModifier, explanations };
  }
}
