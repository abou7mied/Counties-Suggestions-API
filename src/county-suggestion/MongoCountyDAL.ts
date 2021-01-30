import { injectable } from 'inversify'
import { ICountySuggestion, ICountySuggestionDAL, IFindMatchesOptions } from './interfaces'
import CountyModel from './CountyModel'

@injectable()
export default class MongoCountyDAL implements ICountySuggestionDAL {
  async findMatches (filters: Partial<ICountySuggestion>, { limit }: IFindMatchesOptions = { limit: 5 }): Promise<ICountySuggestion[]> {
    if (!filters.name && !filters.state) {
      return []
    }
    if (!filters.state && filters.name && filters.name.length === 2) {
      const counties = await CountyModel.find({
        state: filters.name.toUpperCase()
      }).limit(limit)
      if (counties.length) {
        return counties
      }
    }

    const query: any = {}
    if (filters.name) {
      query.name = {
        $regex: new RegExp(filters.name, 'i')
      }
    }
    if (filters.state) {
      query.state = {
        $regex: new RegExp(filters.state, 'i')
      }
    }
    return await CountyModel.find(query).limit(limit)
  }
}
