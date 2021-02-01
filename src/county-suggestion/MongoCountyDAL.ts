import { injectable } from 'inversify'
import { FilterQuery } from 'mongoose'
import { ICountySuggestion, ICountySuggestionDAL, IFindMatchesOptions } from './interfaces'
import CountyModel from './CountyModel'

@injectable()
export default class MongoCountyDAL implements ICountySuggestionDAL {
  async findByState (state: string, { limit }: IFindMatchesOptions = { limit: 5 }): Promise<ICountySuggestion[]> {
    return await CountyModel.find({
      state: state.toUpperCase()
    }).limit(limit)
  }

  async findMatches (filters: Partial<ICountySuggestion>, { limit }: IFindMatchesOptions = { limit: 5 }): Promise<ICountySuggestion[]> {
    const query: FilterQuery<typeof CountyModel> = {}
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
