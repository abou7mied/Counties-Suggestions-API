import { inject, injectable } from 'inversify'
import mongoose from 'mongoose'
import { IDatabase } from '../interfaces/IDatabase'
import { IConfig } from '../interfaces/IConfig'
import { TYPES } from '../interfaces/types'

@injectable()
export class MongoDatabase implements IDatabase {
  constructor (@inject(TYPES.Config) private readonly config: IConfig) {
  }

  async connect (): Promise<void> {
    await mongoose.connect(this.config.mongo.url, {
      useNewUrlParser: true,
      useFindAndModify: false
    })
  }

  async close (): Promise<void> {
    await mongoose.disconnect()
  }
}
