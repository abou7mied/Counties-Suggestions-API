import express from 'express'
import appRouterFactory from './AppRouter'
import { Container } from 'inversify'

export default (container: Container): express.Application => {
  const app = express()
  const appRouter = appRouterFactory(container)
  app.use(appRouter)
  return app
}
