import { inject, injectable } from 'inversify'
import { IDatabase } from '../interfaces/IDatabase'
import { IConfig } from '../interfaces/IConfig'
import { TYPES } from '../interfaces/types'

@injectable()
export class StaticDatabase implements IDatabase {
  constructor (@inject(TYPES.Config) private readonly config: IConfig) {
  }

  async connect (): Promise<void> {
  }

  async close (): Promise<void> {
  }
}
