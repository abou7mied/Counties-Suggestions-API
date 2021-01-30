import 'reflect-metadata'
import { Container } from 'inversify'
import config from './src/config/config'
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
import StaticCountyDAL from './src/county-suggestion/StaticCountyDAL'
import { IConfig } from './src/interfaces/IConfig'
import { IDatabase } from './src/interfaces/IDatabase'
import { MongoDatabase } from './src/core/MongoDatabase'
import { StaticDatabase } from './src/core/StaticDatabase'
import MongoCountyDAL from './src/county-suggestion/MongoCountyDAL'

export const container = new Container()

container.bind<IConfig>(TYPES.Config)
  .toConstantValue(config)

if (config.countiesDatabaseDriver === 'mongo') {
  container.bind<IDatabase>(TYPES.Database)
    .to(MongoDatabase)
    .inRequestScope()
  container.bind<ICountySuggestionDAL>(TYPES.CountyDAL)
    .to(MongoCountyDAL)
    .inRequestScope()
} else {
  container.bind<IDatabase>(TYPES.Database)
    .to(StaticDatabase)
    .inRequestScope()
  container.bind<ICountySuggestionDAL>(TYPES.CountyDAL)
    .to(StaticCountyDAL)
    .inRequestScope()
}

container.bind<ICountySuggestionController>(TYPES.CountySuggestionController)
  .to(CountySuggestionController)
  .inRequestScope()

container.bind<ICountySuggestionService>(TYPES.CountySuggestionService)
  .to(CountySuggestionService)
  .inRequestScope()

container.bind<IRequestHandlerFactory>(TYPES.RequestHandlerFactory)
  .toFactory(() => {
    return (req, res) => {
      return new RequestHandler(req, res)
    }
  })

export default container
