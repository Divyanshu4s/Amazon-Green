import { z } from 'zod';
import { GoalType } from '../../models/SustainabilityGoal';

export const createGoalSchema = z.object({
  body: z.object({
    type: z.nativeEnum(GoalType),
    targetValue: z.number().int().min(1),
    deadline: z.string().datetime().optional()
  })
});

export const timelineQuerySchema = z.object({
  query: z.object({
    timeframe: z.enum(['daily', 'weekly', 'monthly']).default('monthly')
  })
});
