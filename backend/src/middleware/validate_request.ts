import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        }))
        res.status(400).json({
          message: 'Validation failed',
          errors: formattedErrors,
        })
        return
      }
      res.status(500).json({ message: 'Internal server error during validation' })
    }
  }
