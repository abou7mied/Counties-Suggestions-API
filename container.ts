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
import CountyStaticDAL from './src/county-suggestion/CountyStaticDAL'
import { IConfig } from './src/interfaces/IConfig'
import { IDatabase } from './src/interfaces/IDatabase'
import { MongoDatabase } from './src/core/MongoDatabase'
import { StaticDatabase } from './src/core/StaticDatabase'
import CountyMongoDAL from './src/county-suggestion/CountyMongoDAL'

export const container = new Container()

container.bind<IConfig>(TYPES.Config)
  .toConstantValue(config)

if (config.countiesDatabaseDriver === 'mongo') {
  container.bind<IDatabase>(TYPES.Database)
    .to(MongoDatabase)
    .inRequestScope()
  container.bind<ICountySuggestionDAL>(TYPES.CountyDAL)
    .to(CountyMongoDAL)
    .inRequestScope()
} else {
  container.bind<IDatabase>(TYPES.Database)
    .to(StaticDatabase)
    .inRequestScope()
  container.bind<ICountySuggestionDAL>(TYPES.CountyDAL)
    .to(CountyStaticDAL)
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
