import { injectable, inject } from 'inversify'
import { TYPES } from '../interfaces/types'
import { ICountySuggestion, ICountySuggestionController, ICountySuggestionService } from './interfaces'

@injectable()
export default class CountySuggestionController implements ICountySuggestionController {
  constructor (@inject(TYPES.CountySuggestionService) private readonly countySuggestionService: ICountySuggestionService) {
  }

  async getSuggestions (query: string): Promise<ICountySuggestion[]> {
    const suggestions = await this.countySuggestionService.getSuggestions(query.toLowerCase())
    return suggestions.map(({ name, state, fips }) => ({ name, state, fips }))
  }
}
