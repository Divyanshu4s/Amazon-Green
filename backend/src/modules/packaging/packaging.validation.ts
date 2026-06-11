import { z } from 'zod';
import { PackagingTypeEnum } from '../../models/PackagingMaterial';

export const optimizeRequestSchema = z.object({
  body: z.object({
    products: z.array(z.object({
      productId: z.string(),
      quantity: z.number().int().min(1),
      length: z.number().min(0.1),
      width: z.number().min(0.1),
      height: z.number().min(0.1),
      weight: z.number().min(0.01),
    })).min(1),
    preferredType: z.nativeEnum(PackagingTypeEnum).default(PackagingTypeEnum.STANDARD)
  })
});

export const compareRequestSchema = z.object({
  body: z.object({
    products: z.array(z.object({
      productId: z.string(),
      quantity: z.number().int().min(1),
      length: z.number().min(0.1),
      width: z.number().min(0.1),
      height: z.number().min(0.1),
      weight: z.number().min(0.01),
    })).min(1)
  })
});
