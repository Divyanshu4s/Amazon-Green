import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    category: z.string().min(2),
    subcategory: z.string().optional(),
    images: z.array(z.string().url()).min(1),
    price: z.number().min(0),
    stock: z.number().int().min(0),
    plasticPercentage: z.number().min(0).max(100).optional(),
    
    // GeoLocation
    location: z.object({
      type: z.literal('Point').default('Point'),
      coordinates: z.tuple([z.number(), z.number()]), // [lng, lat]
    }),

    // Sustainability Meta
    metadata: z.object({
      materialType: z.string(),
      recycledContentPercentage: z.number().min(0).max(100),
      recyclable: z.boolean(),
      reusable: z.boolean(),
      repairable: z.boolean(),
      lifespanYears: z.number().min(0),
      packagingType: z.string(),
      energySaving: z.boolean().optional(),
      waterSaving: z.boolean().optional(),
    })
  })
});

export const updateProductSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    price: z.number().min(0).optional(),
    stock: z.number().int().min(0).optional(),
  })
});

export const nearbySearchSchema = z.object({
  query: z.object({
    lat: z.string(),
    lng: z.string(),
    radius: z.string().default('10'), // default 10km
  })
});
