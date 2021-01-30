import { inject, injectable } from 'inversify'
import { ICountySuggestionDAL, ICountySuggestionService } from './interfaces'
import { TYPES } from '../interfaces/types'

@injectable()
export default class CountySuggestionService implements ICountySuggestionService {
  constructor (@inject(TYPES.MongoCountySuggestionDAL) private readonly countySuggestionDAL: ICountySuggestionDAL) {

  }

  async getSuggestions (query: string): Promise<any> {
    const [name, state] = query.split(',').map(item => item.trim())
    return await this.countySuggestionDAL.findMatches({ name, state })
  }
}
