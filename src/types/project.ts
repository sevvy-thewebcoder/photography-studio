import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  category: z.enum(['Fashion & Portrait', 'Body & Swim']),
  coverImage: z.string(),
  images: z.array(z.string()),
  models: z.array(z.string()),
  location: z.string(),
  hairAndMakeupBy: z.string().optional(),
  videoBy: z.string().optional(),
  stylingBy: z.string().optional(),
  stylingAssistanceBy: z.string().optional(),
  year: z.number(),
});

export const GridSettingsSchema = z.object({
  columns: z.number().min(1).max(6).default(6)
});

export type Project = z.infer<typeof ProjectSchema>;
export type GridSettings = z.infer<typeof GridSettingsSchema>;