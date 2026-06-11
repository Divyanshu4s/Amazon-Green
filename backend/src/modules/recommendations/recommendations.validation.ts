import { z } from 'zod';
import { RecommendationType } from '../../models/RecommendationLog';

export const localRecommendSchema = z.object({
  query: z.object({
    lat: z.string(),
    lng: z.string(),
    radius: z.string().optional()
  })
});

export const trackRecommendationSchema = z.object({
  body: z.object({
    productId: z.string(),
    type: z.nativeEnum(RecommendationType),
    action: z.enum(['view', 'click', 'purchase']),
    ecoScore: z.number(),
    confidence: z.number()
  })
});
