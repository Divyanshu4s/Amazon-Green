import { TimeSeriesAnalyticsService } from './time-series-analytics.service';

export class InsightGenerationService {
  /**
   * Generates dynamic text insights by comparing recent trends.
   */
  static async generatePersonalizedInsights(userId: string) {
    const insights: string[] = [];
    
    // Fetch monthly timeline
    const timeline = await TimeSeriesAnalyticsService.getImpactTimeline(userId, 'monthly');
    
    if (timeline.length >= 2) {
      const thisMonth = timeline[timeline.length - 1];
      const lastMonth = timeline[timeline.length - 2];

      const diff = thisMonth.carbonSaved - lastMonth.carbonSaved;
      if (diff > 0) {
        const percent = Math.round((diff / lastMonth.carbonSaved) * 100);
        insights.push(`Great job! You saved ${percent}% more carbon this month compared to last month.`);
      } else {
        insights.push(`You're a bit behind last month's pace. Check out our Green Alternatives to catch up!`);
      }
    } else {
      insights.push(`Welcome to your eco-journey! Start shopping green to generate impact insights.`);
    }

    // Static heuristic examples based on the platform's knowledge base
    insights.push(`Switching your standard deliveries to Group Deliveries could save an additional 15% in emissions.`);
    insights.push(`Buying locally sourced products dramatically reduces your carbon footprint from transport.`);

    return insights;
  }
}
