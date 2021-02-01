import { injectable } from 'inversify'
import { ICountySuggestion, ICountySuggestionDAL, IFindMatchesOptions } from './interfaces'
import counties from './data/counties.json'

@injectable()
export default class CountyStaticDAL implements ICountySuggestionDAL {
  private readonly statesMap: { [state: string]: ICountySuggestion[] } = {}

  constructor () {
    for (const county of counties) {
      if (!this.statesMap[county.state]) {
        this.statesMap[county.state] = []
      }
      this.statesMap[county.state].push(county)
    }
  }

  async findByState (state: string, { limit }: IFindMatchesOptions = { limit: 5 }): Promise<ICountySuggestion[]> {
    return this.statesMap[state.toUpperCase()].slice(0, limit)
  }

  async findMatches (filters: Partial<ICountySuggestion>, { limit }: IFindMatchesOptions = { limit: 5 }): Promise<ICountySuggestion[]> {
    const results = []
    for (const county of counties) {
      if (results.length < limit) {
        let matched = true
        if (filters.name !== undefined) {
          matched &&= !!(county.name.match(new RegExp(filters.name, 'i')))
        }
        if (filters.state !== undefined) {
          matched &&= !!(county.state.match(new RegExp(filters.state, 'i')))
        }
        if (matched) {
          results.push(county)
        }
      } else {
        break
      }
    }
    return results
  }
}
