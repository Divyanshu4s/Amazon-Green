import Product from '../../../models/Product';
import { AppError } from '../../../utils/AppError';

export class ProductDiscoveryService {
  /**
   * Fetches product details including ML Confidence, Breakdown, and Seller Info.
   */
  static async getProductDetails(productId: string) {
    const product = await Product.findOne({ _id: productId, isDeleted: false })
      .populate('seller', 'businessName sustainabilityScore verificationStatus carbonNeutralShipping ecoBadge');

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }

  /**
   * Advanced MongoDB search with filtering, aggregation, and pagination.
   */
  static async searchProducts(query: any) {
    const { 
      keyword, category, minPrice, maxPrice, 
      minEcoScore, recyclable, reusable, plasticFree, 
      locallySourced, page = 1, limit = 10, sortBy = 'ecoScore'
    } = query;

    const filter: any = { isDeleted: false };

    if (keyword) filter.$text = { $search: keyword };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Green Filters
    if (minEcoScore) filter.ecoScore = { $gte: Number(minEcoScore) };
    if (recyclable === 'true') filter['metadata.recyclable'] = true;
    if (reusable === 'true') filter['metadata.reusable'] = true;
    if (plasticFree === 'true') filter['metadata.packagingType'] = { $not: /plastic/i };

    const sortOpt: any = {};
    if (sortBy === 'priceAsc') sortOpt.price = 1;
    else if (sortBy === 'priceDesc') sortOpt.price = -1;
    else sortOpt.ecoScore = -1; // Default to greenest first

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).populate('seller', 'businessName ecoBadge').sort(sortOpt).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    return {
      data: products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      }
    };
  }

  /**
   * Sustainability Radius: Geospatial search using $geoNear
   */
  static async getNearbySustainableProducts(lat: number, lng: number, radiusKm: number) {
    const products = await Product.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lng, lat] },
          distanceField: 'distance',
          maxDistance: radiusKm * 1000, // meters
          spherical: true,
          query: { isDeleted: false, ecoScore: { $gte: 70 } } // Only suggest fairly green local stuff
        }
      },
      {
        $project: {
          title: 1, price: 1, ecoScore: 1, distance: 1,
          carbonSavingsEstimate: { $multiply: [ '$distance', 0.002 ] } // Mock calc: saving 0.002kg CO2 per meter saved vs long haul
        }
      },
      { $sort: { distance: 1 } },
      { $limit: 20 }
    ]);

    return products;
  }

  /**
   * Green Alternative Engine: Suggest higher EcoScore products in same category/price bounds.
   */
  static async getGreenAlternatives(productId: string) {
    const product = await Product.findById(productId);
    if (!product) throw new AppError('Product not found', 404);

    const alternatives = await Product.find({
      _id: { $ne: product._id },
      isDeleted: false,
      category: product.category,
      ecoScore: { $gt: product.ecoScore }, // Strictly greener
      price: { $gte: product.price * 0.7, $lte: product.price * 1.5 } // Within 30-50% price range
    })
    .populate('seller', 'businessName ecoBadge')
    .sort({ ecoScore: -1 })
    .limit(5);

    return alternatives;
  }
}
