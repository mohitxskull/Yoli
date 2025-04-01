import { mysqlTable, varchar, text, timestamp, int } from 'drizzle-orm/mysql-core'
import { relations } from 'drizzle-orm'

export const projects = mysqlTable('projects', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }),
  author: varchar('author', { length: 100 }),
  imageUrl: varchar('image_url', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

export const savedProjects = mysqlTable('saved_projects', {
  id: int('id', { unsigned: true }).primaryKey().autoincrement(),
  projectId: int('project_id', { unsigned: true })
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  savedAt: timestamp('saved_at').defaultNow().notNull(),
})

export const savedProjectsRelations = relations(savedProjects, ({ one }) => ({
  project: one(projects, {
    fields: [savedProjects.projectId],
    references: [projects.id],
  }),
}))

export const projectsRelations = relations(projects, ({ many }) => ({
  savedEntries: many(savedProjects),
}))

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
export type SavedProject = typeof savedProjects.$inferSelect
export type NewSavedProject = typeof savedProjects.$inferInsert
