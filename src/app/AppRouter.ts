import express from 'express'
import countySuggestionRouterFactory from '../county-suggestion/CountySuggestionRouter'
import { Container } from 'inversify'

export default (container: Container): express.Router => {
  const router = express.Router()
  const countySuggestionRouter = countySuggestionRouterFactory(container)
  router.use('/suggest', countySuggestionRouter)
  return router
}
