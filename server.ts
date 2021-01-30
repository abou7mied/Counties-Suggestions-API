import appFactory from './src/app/App'
import config from './src/config/config'
import container from './container'
import { TYPES } from './src/interfaces/types'
import { IDatabase } from './src/interfaces/IDatabase'

const database = container.get<IDatabase>(TYPES.Database)

const app = appFactory(container);

(async () => {
  console.log('countiesDatabaseDriver', config.countiesDatabaseDriver)
  await database.connect()
  app.listen(config.httpPort, () => {
    console.log(`Listening on ${config.httpPort}`)
  })
})()
