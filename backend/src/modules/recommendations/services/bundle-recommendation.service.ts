import Product from '../../../models/Product';

export class BundleRecommendationService {
  /**
   * Generates logical eco-bundles.
   * Mocked implementation.
   */
  static async getBundles() {
    // In a real app, this finds items frequently bought together via FP-Growth or Apriori.
    // We mock by pulling high-ecoscore items in Home/Kitchen categories.
    const kitchenItems = await Product.find({ ecoScore: { $gte: 80 } }).limit(3);
    
    if (kitchenItems.length === 0) return [];

    let totalOriginalPrice = 0;
    let avgEcoScore = 0;

    kitchenItems.forEach(i => {
      totalOriginalPrice += i.price;
      avgEcoScore += i.ecoScore;
    });
    avgEcoScore = Math.round(avgEcoScore / kitchenItems.length);

    return [
      {
        bundleName: 'Eco Kitchen Starter Kit',
        items: kitchenItems,
        totalOriginalPrice,
        bundlePrice: Number((totalOriginalPrice * 0.9).toFixed(2)), // 10% discount
        averageEcoScore: avgEcoScore,
        explanations: ["Buying together reduces packaging waste and delivery trips."]
      }
    ];
  }
}
