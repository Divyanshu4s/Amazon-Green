import { z } from 'zod';
import { VehicleType } from './types';

export const routeRequestSchema = z.object({
  body: z.object({
    origin: z.object({ lat: z.number(), lng: z.number() }),
    destination: z.object({ lat: z.number(), lng: z.number() }),
    vehicleType: z.nativeEnum(VehicleType).default(VehicleType.DIESEL_VAN),
  })
});

export const greenRequestSchema = z.object({
  body: z.object({
    origin: z.object({ lat: z.number(), lng: z.number() }),
    destination: z.object({ lat: z.number(), lng: z.number() }),
    payloadWeightKg: z.number().min(0.1)
  })
});

export const groupRequestSchema = z.object({
  body: z.object({
    orders: z.array(z.any()), // Expected to be array of unclustered order objects
    radiusKm: z.number().min(1).default(5)
  })
});

export const radiusQuerySchema = z.object({
  query: z.object({
    lat: z.string(),
    lng: z.string(),
    radius: z.string().default('10')
  })
});

export const nudgeQuerySchema = z.object({
  query: z.object({
    distanceKm: z.string(),
    isLocalBetter: z.string().optional(),
    localCarbonSavedKg: z.string().optional()
  })
});
