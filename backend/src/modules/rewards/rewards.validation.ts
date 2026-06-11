import { z } from 'zod';

export const redeemTreesSchema = z.object({
  body: z.object({
    requestedTrees: z.number().int().min(1, "Must redeem at least 1 tree"),
  })
});

export const orderCompleteWebhookSchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
    userId: z.string().min(1),
    ecoScore: z.number().min(0).max(100),
    isGroupDelivery: z.boolean(),
    isMinimalPackaging: z.boolean(),
    isLocalProduct: z.boolean(),
    isVerifiedGreenSeller: z.boolean(),
    estimatedCarbonSaved: z.number().min(0),
    estimatedPlasticSaved: z.number().min(0),
  })
});
