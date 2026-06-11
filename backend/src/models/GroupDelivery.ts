import mongoose, { Schema, Document, Types } from 'mongoose';

export enum DeliveryStatus {
  GATHERING = 'gathering',
  SCHEDULED = 'scheduled',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface IGroupDelivery extends Document {
  clusterId: string;
  hubLocation: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  radiusKm: number;
  deliveryDate: Date;
  status: 'open' | 'locked' | 'in_transit' | 'completed';
  
  // Array of specific orders and their exact locations included in this run
  waypoints: {
    order: Types.ObjectId;
    location: {
      type: 'Point';
      coordinates: [number, number];
    };
  }[];

  // Aggregated Impact Metrics for this specific run
  totalCarbonSaved: number;
  tripsAvoided: number;
  
  participants: Types.ObjectId[];
  maxParticipants: number;
  createdAt: Date;
  updatedAt: Date;
}

const GroupDeliverySchema: Schema = new Schema(
  {
    clusterId: { type: String, required: true, unique: true },
    hubLocation: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    radiusKm: { type: Number, required: true, default: 5 },
    deliveryDate: { type: Date, required: true },
    status: { type: String, enum: ['open', 'locked', 'in_transit', 'completed'], default: 'open' },
    
    waypoints: [
      {
        order: { type: Schema.Types.ObjectId, ref: 'Order' },
        location: {
          type: { type: String, enum: ['Point'], default: 'Point' },
          coordinates: { type: [Number], required: true },
        }
      }
    ],

    totalCarbonSaved: { type: Number, default: 0 },
    tripsAvoided: { type: Number, default: 0 },

    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    maxParticipants: { type: Number, default: 10 },
  },
  { timestamps: true }
);

GroupDeliverySchema.index({ status: 1 });

export default mongoose.model<IGroupDelivery>('GroupDelivery', GroupDeliverySchema);
