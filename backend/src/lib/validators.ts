import { z } from 'zod'

export const createProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  category: z.string().optional(),
  author: z.string().min(1, 'Author is required'),
  imageUrl: z.string().url('Must be a valid URL').optional(),
})

export const updateProjectSchema = createProjectSchema.partial()

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  query: z.string().optional(), // For search
})

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive('ID must be a positive integer'),
})

export const addToCartSchema = z.object({
  projectId: z.number().int().positive('Invalid Project ID'),
})
