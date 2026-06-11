import { z } from 'zod';

export const calculateEcoScoreSchema = z.object({
  body: z.object({
    materialType: z.string().min(1),
    recycledContentPercentage: z.number().min(0).max(100),
    renewableSource: z.boolean(),
    recyclability: z.boolean(),
    
    energySaving: z.boolean(),
    waterSaving: z.boolean(),
    reusable: z.boolean(),
    refillable: z.boolean(),
    wasteReduction: z.boolean(),
    repairable: z.boolean(),

    lifespanYears: z.number().min(0),
    warrantyYears: z.number().min(0),
    reuseCycles: z.number().min(0),

    packagingMaterial: z.string().min(1),
    packagingRecyclable: z.boolean(),
    plasticPercentage: z.number().min(0).max(100),
    packagingEfficiency: z.number().min(0).max(100),

    sellerLocation: z.object({ lat: z.number(), lng: z.number() }),
    customerLocation: z.object({ lat: z.number(), lng: z.number() }),

    tags: z.array(z.string()).default([]),
  }),
});

export const auditEcoScoreSchema = calculateEcoScoreSchema.extend({
  body: calculateEcoScoreSchema.shape.body.extend({
    productId: z.string().min(1, 'Product ID is required to perform an audit'),
  }),
});
