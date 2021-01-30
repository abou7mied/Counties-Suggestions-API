import { IConfig } from '../interfaces/IConfig'

const config: IConfig = {
  httpPort: typeof process.env.HTTP_PORT !== 'undefined' ? Number(process.env.HTTP_PORT) : 3000
}

export default config
