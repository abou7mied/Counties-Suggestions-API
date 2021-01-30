import { Router } from 'express'
import { Container } from 'inversify'
import { IRequestHandler, IRequestHandlerFactory } from '../interfaces/IRequestHandler'
import { TYPES } from '../interfaces/types'
import { ICountySuggestionController } from './interfaces'

async function suggestRoute (requestHandler: IRequestHandler, container: Container): Promise<void> {
  const countySuggestionController = container.get<ICountySuggestionController>(TYPES.CountySuggestionController)
  const query = requestHandler.getQuery()
  const data = await countySuggestionController.getSuggestions(query.q !== undefined ? query.q : '')
  requestHandler.json(data)
}

export default (container: Container): Router => {
  const router = Router()
  const requestHandlerFactory = container.get<IRequestHandlerFactory>(TYPES.RequestHandlerFactory)

  router.get('/', (req, res) => {
    const requestHandler = requestHandlerFactory(req, res)
    suggestRoute(requestHandler, container)
  })

  return router
}
