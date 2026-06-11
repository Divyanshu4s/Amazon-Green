import mongoose, { Schema, Document, Types } from 'mongoose';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PackagingOption {
  STANDARD = 'standard',
  MINIMAL = 'minimal',
  BIODEGRADABLE = 'biodegradable',
}

export interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
  ecoScoreAtPurchase: number;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  products: IOrderProduct[];
  deliveryAddress: string;
  paymentStatus: PaymentStatus;
  
  // Green Features
  sustainableDeliverySelected: boolean;
  groupDeliverySelected: boolean;
  packagingOptionSelected: PackagingOption;
  carbonSaved: number;

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        priceAtPurchase: { type: Number, required: true }, // Snapshotted price
        ecoScoreAtPurchase: { type: Number, required: true }, // Snapshotted score
      },
    ],
    deliveryAddress: { type: String, required: true },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING },

    // Green Features
    sustainableDeliverySelected: { type: Boolean, default: false },
    groupDeliverySelected: { type: Boolean, default: false },
    packagingOptionSelected: { 
      type: String, 
      enum: Object.values(PackagingOption), 
      default: PackagingOption.STANDARD 
    },
    carbonSaved: { type: Number, default: 0, min: 0 }, // kg
  },
  { timestamps: true }
);

// Indexes
OrderSchema.index({ user: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ createdAt: -1 });

export default mongoose.model<IOrder>('Order', OrderSchema);
