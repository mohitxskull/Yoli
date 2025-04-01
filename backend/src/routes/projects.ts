import { Router } from 'express'
import { db } from '@/db'
import { projects } from '@/db/schema'
import { eq, sql, desc, like } from 'drizzle-orm'
import { validateRequest } from '@/middleware/validate_request'
import {
  createProjectSchema,
  updateProjectSchema,
  paginationSchema,
  idParamSchema,
} from '@/lib/validators'
import z from 'zod'

const router = Router()

router.get('/', validateRequest(z.object({ query: paginationSchema })), async (req, res) => {
  const { limit, page, query }: z.infer<typeof paginationSchema> = req.query as any

  const offset = (page - 1) * limit

  try {
    const whereClause = query ? like(projects.title, `%${query}%`) : undefined

    const projectList = await db
      .select()
      .from(projects)
      .where(whereClause)
      .orderBy(desc(projects.createdAt))
      .limit(limit)
      .offset(offset)

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(projects)
      .where(whereClause)

    const totalProjects = totalResult[0].count
    const totalPages = Math.ceil(totalProjects / limit)

    res.json({
      data: projectList,
      meta: {
        totalItems: totalProjects,
        itemCount: projectList.length,
        itemsPerPage: limit,
        totalPages: totalPages,
        currentPage: page,
      },
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ message: 'Failed to fetch projects' })
  }
})

router.get(
  '/:id',
  validateRequest(z.object({ params: idParamSchema })),
  async (req, res): Promise<void> => {
    const { id }: z.infer<typeof idParamSchema> = req.params as any
    try {
      const project = await db.select().from(projects).where(eq(projects.id, id)).limit(1)
      if (project.length === 0) {
        res.status(404).json({ message: 'Project not found' })
        return
      }
      res.json(project[0])
    } catch (error) {
      console.error('Error fetching project:', error)
      res.status(500).json({ message: 'Failed to fetch project' })
    }
  }
)

router.post('/', validateRequest(z.object({ body: createProjectSchema })), async (req, res) => {
  const newProjectData = req.body as z.infer<typeof createProjectSchema>
  try {
    const result = await db.insert(projects).values(newProjectData)

    const insertedId = result[0].insertId

    if (!insertedId) {
      throw new Error('Failed to get inserted ID')
    }

    const newProject = await db.select().from(projects).where(eq(projects.id, insertedId)).limit(1)

    res.status(201).json(newProject[0])
  } catch (error) {
    console.error('Error creating project:', error)
    res.status(500).json({ message: 'Failed to create project' })
  }
})

// PUT /projects/:id
router.put(
  '/:id',
  validateRequest(z.object({ params: idParamSchema, body: updateProjectSchema })),
  async (req, res): Promise<void> => {
    const { id }: z.infer<typeof idParamSchema> = req.params as any
    const updateData = req.body as z.infer<typeof updateProjectSchema>

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ message: 'No update data provided' })
      return
    }

    try {
      const existing = await db
        .select({ id: projects.id })
        .from(projects)
        .where(eq(projects.id, id))
        .limit(1)
      if (existing.length === 0) {
        res.status(404).json({ message: 'Project not found' })
        return
      }

      await db.update(projects).set(updateData).where(eq(projects.id, id))
      const updatedProject = await db.select().from(projects).where(eq(projects.id, id)).limit(1)
      res.json(updatedProject[0])
    } catch (error) {
      console.error('Error updating project:', error)
      res.status(500).json({ message: 'Failed to update project' })
    }
  }
)

router.delete(
  '/:id',
  validateRequest(z.object({ params: idParamSchema })),
  async (req, res): Promise<void> => {
    const { id }: z.infer<typeof idParamSchema> = req.params as any
    try {
      const existing = await db
        .select({ id: projects.id })
        .from(projects)
        .where(eq(projects.id, id))
        .limit(1)
      if (existing.length === 0) {
        res.status(404).json({ message: 'Project not found' })
        return
      }
      await db.delete(projects).where(eq(projects.id, id))
      res.status(204).send() // No content
    } catch (error) {
      console.error('Error deleting project:', error)
      res.status(500).json({ message: 'Failed to delete project' })
    }
  }
)

export default router
