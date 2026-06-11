import mongoose, { Schema, Document } from 'mongoose';

export enum PackagingTypeEnum {
  STANDARD = 'standard',
  ECO = 'eco',
  MINIMAL = 'minimal',
  COMPOSTABLE = 'compostable',
  RECYCLED = 'recycled',
}

export interface IPackagingMaterial extends Document {
  name: string;
  materialType: PackagingTypeEnum;
  recyclable: boolean;
  compostable: boolean;
  carbonFactor: number; // kg CO2 equivalent per unit of packaging
  costPerUnit: number;
  durabilityScore: number; // 0-100
  plasticPercentage: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

const PackagingMaterialSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    materialType: { type: String, enum: Object.values(PackagingTypeEnum), required: true },
    recyclable: { type: Boolean, default: false },
    compostable: { type: Boolean, default: false },
    carbonFactor: { type: Number, required: true, min: 0 },
    costPerUnit: { type: Number, required: true, min: 0 },
    durabilityScore: { type: Number, required: true, min: 0, max: 100 },
    plasticPercentage: { type: Number, required: true, min: 0, max: 100, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IPackagingMaterial>('PackagingMaterial', PackagingMaterialSchema);
