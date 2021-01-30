import express from 'express'
import countySuggestionRouterFactory from '../county-suggestion/CountySuggestionRouter'
import { Container } from 'inversify'
import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'

export default (container: Container): express.Router => {
  const router = express.Router()
  const swaggerDocument = YAML.load('./spec.yaml')
  const countySuggestionRouter = countySuggestionRouterFactory(container)

  router.use('/suggest', countySuggestionRouter)
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  return router
}
