import mongoose, { Schema, Document, Types } from 'mongoose';

export enum UserRole {
  CUSTOMER = 'customer',
  SELLER = 'seller',
  ADMIN = 'admin',
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  profileImage?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  greenCredits: number;
  saplingCoins: number;
  carbonSaved: number;
  plasticSaved: number;
  treesPlanted: number;
  ecoLevel: number;
  badges: string[];
  
  viewedProducts: Types.ObjectId[];
  wishlist: Types.ObjectId[];
  categoryPreferences: string[];

  refreshToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: { type: String, minlength: 6 },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.CUSTOMER },
    profileImage: { type: String },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
    greenCredits: { type: Number, default: 0, min: 0 },
    saplingCoins: { type: Number, default: 0, min: 0 },
    carbonSaved: { type: Number, default: 0, min: 0 }, // In kilograms
    plasticSaved: { type: Number, default: 0, min: 0 }, // In kilograms
    treesPlanted: { type: Number, default: 0, min: 0 },
    ecoLevel: { type: Number, default: 1, min: 1 },
    badges: [{ type: String }],
    
    viewedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    categoryPreferences: [{ type: String }],

    refreshToken: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  { timestamps: true }
);

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ location: '2dsphere' }); // For location-based group deliveries

export default mongoose.model<IUser>('User', UserSchema);
