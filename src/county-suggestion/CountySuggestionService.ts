import { inject, injectable } from 'inversify'
import { ICountySuggestion, ICountySuggestionDAL, ICountySuggestionService } from './interfaces'
import { TYPES } from '../interfaces/types'

@injectable()
export default class CountySuggestionService implements ICountySuggestionService {
  constructor (@inject(TYPES.CountyDAL) private readonly countySuggestionDAL: ICountySuggestionDAL) {

  }

  async getSuggestions (query: string): Promise<ICountySuggestion[]> {
    const [name, state] = query.split(',').map(item => item.trim())

    if (!name && !state) {
      return []
    }

    if (query.length === 2) {
      const suggestions = await this.countySuggestionDAL.findMatches({ state })
      if (suggestions.length) {
        return suggestions
      }
    }

    return await this.countySuggestionDAL.findMatches({ name, state })
  }
}
