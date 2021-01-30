import appFactory from './src/app/App'
import config from './src/config/config'
import container from './container'

const app = appFactory(container)

app.listen(config.httpPort, () => {
  console.log(`Listening on ${config.httpPort}`)
})
