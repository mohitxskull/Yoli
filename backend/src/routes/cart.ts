import { Router } from 'express'
import { db } from '@/db'
import { savedProjects, projects } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { addToCartSchema } from '@/lib/validators'
import { z } from 'zod' // Ensure z is imported if not already
import { validateRequest } from '@/middleware/validate_request'

const router = Router()

router.post(
  '/',
  validateRequest(z.object({ body: addToCartSchema })),
  async (req, res): Promise<void> => {
    const { projectId }: z.infer<typeof addToCartSchema> = req.body

    try {
      // Check if project exists
      const projectExists = await db
        .select({ id: projects.id })
        .from(projects)
        .where(eq(projects.id, projectId))
        .limit(1)
      if (projectExists.length === 0) {
        res.status(404).json({ message: 'Project not found' })
        return
      }

      const alreadySaved = await db
        .select()
        .from(savedProjects)
        .where(eq(savedProjects.projectId, projectId))
        .limit(1)

      if (alreadySaved.length > 0) {
        res.status(409).json({ message: 'Project already saved' })
        return
      }

      // Add to saved projects
      await db.insert(savedProjects).values({ projectId })
      res.status(201).json({ message: 'Project added to cart' })
    } catch (error: any) {
      console.error('Error adding to cart:', error)
      res.status(500).json({ message: 'Failed to add project to cart' })
    }
  }
)

router.get('/', async (_req, res) => {
  try {
    const savedItems = await db
      .select({
        id: projects.id,
        title: projects.title,
        description: projects.description,
        category: projects.category,
        author: projects.author,
        imageUrl: projects.imageUrl,
        savedAt: savedProjects.savedAt,
      })
      .from(savedProjects)
      .innerJoin(projects, eq(savedProjects.projectId, projects.id))
      .orderBy(desc(savedProjects.savedAt))

    res.json(savedItems)
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ message: 'Failed to fetch saved projects' })
  }
})

export default router
