import { ICountySuggestion, ICountySuggestionDAL } from './interfaces'

export default class MongoCountySuggestionDAL implements ICountySuggestionDAL {
  async findMatches (filters: Partial<ICountySuggestion>): Promise<ICountySuggestion[]> {
    return []
  }
}
