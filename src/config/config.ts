import dotEnv from 'dotenv-flow'
import { IConfig } from '../interfaces/IConfig'

dotEnv.config()

const config: IConfig = {
  httpPort: typeof process.env.HTTP_PORT !== 'undefined' ? Number(process.env.HTTP_PORT) : 3000,
  mongo: {
    url: process.env.MONGO_URL ?? 'mongodb://127.0.0.1/counties'
  },
  countiesDatabaseDriver: process.env.COUNTIES_DATABASE_DRIVER === 'mongo' ? 'mongo' : 'static'
}

export default config
