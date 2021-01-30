import 'reflect-metadata'
import { Container } from 'inversify'
import { IRequestHandlerFactory } from './src/interfaces/IRequestHandler'
import { TYPES } from './src/interfaces/types'
import RequestHandler from './src/core/RequestHandler'
import {
  ICountySuggestionController,
  ICountySuggestionDAL,
  ICountySuggestionService
} from './src/county-suggestion/interfaces'
import CountySuggestionController from './src/county-suggestion/CountySuggestionController'
import CountySuggestionService from './src/county-suggestion/CountySuggestionService'
import StaticCountySuggestionDAL from './src/county-suggestion/StaticCountySuggestionDAL'

export const container = new Container()

container.bind<ICountySuggestionController>(TYPES.CountySuggestionController)
  .to(CountySuggestionController)
  .inRequestScope()

container.bind<ICountySuggestionService>(TYPES.CountySuggestionService)
  .to(CountySuggestionService)
  .inRequestScope()

container.bind<ICountySuggestionDAL>(TYPES.MongoCountySuggestionDAL)
  .to(StaticCountySuggestionDAL)
  .inRequestScope()

container.bind<IRequestHandlerFactory>(TYPES.RequestHandlerFactory)
  .toFactory(() => {
    return (req, res) => {
      return new RequestHandler(req, res)
    }
  })

export default container
