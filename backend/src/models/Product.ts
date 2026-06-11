import mongoose, { Schema, Document, Types } from 'mongoose';

export enum EcoGrade {
  A_PLUS = 'A+',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
}

export interface IProduct extends Document {
  title: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  seller: Types.ObjectId;
  stock: number;
  
  // Physical Dimensions
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  
  // Sustainability Fields
  ecoScore: number;
  ecoGrade: EcoGrade;
  materialScore: number;
  userImpactScore: number;
  durabilityScore: number;
  packagingScore: number;
  localityScore: number;
  mlConfidence: number;
  scoreBreakdown: string[];

  // Geo Location & Status
  location: {
    type: string;
    coordinates: number[];
  };
  isDeleted: boolean;

  // Product Sustainability Metadata
  metadata: {
    materialType: string;
    recycledContentPercentage: number;
    recyclable: boolean;
    reusable: boolean;
    repairable: boolean;
    lifespanYears: number;
    originCountry: string;
    manufacturingMethod: string;
    packagingType: string;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    images: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },

    // Physical Dimensions (in cm and kg)
    dimensions: {
      length: { type: Number, default: 10, min: 0.1 },
      width: { type: Number, default: 10, min: 0.1 },
      height: { type: Number, default: 10, min: 0.1 },
      weight: { type: Number, default: 1, min: 0.01 },
    },

    // Sustainability Fields
    ecoScore: { type: Number, default: 0, min: 0, max: 100 },
    ecoGrade: { type: String, enum: Object.values(EcoGrade), default: EcoGrade.F },
    materialScore: { type: Number, default: 0, min: 0, max: 100 },
    userImpactScore: { type: Number, default: 0, min: 0, max: 100 },
    durabilityScore: { type: Number, default: 0, min: 0, max: 100 },
    packagingScore: { type: Number, default: 0, min: 0, max: 100 },
    localityScore: { type: Number, default: 0, min: 0, max: 100 },
    mlConfidence: { type: Number, default: 0, min: 0, max: 100 },
    scoreBreakdown: [{ type: String }],

    // Geo Location & Status
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    isDeleted: { type: Boolean, default: false },

    // Metadata
    metadata: {
      materialType: { type: String, default: 'Unknown' },
      recycledContentPercentage: { type: Number, default: 0, min: 0, max: 100 },
      recyclable: { type: Boolean, default: false },
      reusable: { type: Boolean, default: false },
      repairable: { type: Boolean, default: false },
      lifespanYears: { type: Number, default: 1, min: 0 },
      originCountry: { type: String, default: 'Unknown' },
      manufacturingMethod: { type: String, default: 'Standard' },
      packagingType: { type: String, default: 'Standard' },
    },
  },
  { timestamps: true }
);

// Indexes
ProductSchema.index({ category: 1, ecoScore: -1 }); // Optimized for filtering green products in a category
ProductSchema.index({ seller: 1 });
ProductSchema.index({ title: 'text', description: 'text' }); // Search optimization
ProductSchema.index({ location: '2dsphere' }); // Geospatial queries
ProductSchema.index({ isDeleted: 1 });

export default mongoose.model<IProduct>('Product', ProductSchema);
