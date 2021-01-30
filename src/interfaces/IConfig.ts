interface IConfig {
  httpPort: number
  mongo: {
    url: string
  }
  countiesDatabaseDriver: 'static' | 'mongo'
}

export {
  IConfig
}
