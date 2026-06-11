import Product from '../../../models/Product';

export class ContentRecommendationEngine {
  /**
   * Finds products with similar features (Category, Material, Price).
   */
  static async getSimilarProducts(productId: string, limit = 10) {
    const baseProduct = await Product.findById(productId);
    if (!baseProduct) return [];

    // Simulate TF-IDF / Cosine Similarity by matching exactly on category 
    // and querying close price ranges.
    const priceRange = {
      $gte: baseProduct.price * 0.7,
      $lte: baseProduct.price * 1.3
    };

    const similar = await Product.find({
      _id: { $ne: baseProduct._id },
      category: baseProduct.category,
      price: priceRange,
      isDeleted: false
    })
    .sort({ ecoScore: -1 }) // Inherently bias towards sustainable
    .limit(limit);

    return similar;
  }
}
