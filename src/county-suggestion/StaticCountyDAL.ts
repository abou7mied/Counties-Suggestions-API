import { injectable } from 'inversify'
import { ICountySuggestion, ICountySuggestionDAL, IFindMatchesOptions } from './interfaces'
import counties from './data/counties.json'

@injectable()
export default class StaticCountyDAL implements ICountySuggestionDAL {
  private readonly statesMap: { [state: string]: ICountySuggestion[] } = {}

  constructor () {
    for (const county of counties) {
      if (!this.statesMap[county.state]) {
        this.statesMap[county.state] = []
      }
      this.statesMap[county.state].push(county)
    }
  }

  async findMatches (filters: Partial<ICountySuggestion>, { limit }: IFindMatchesOptions = { limit: 5 }): Promise<ICountySuggestion[]> {
    if (!filters.name && !filters.state) {
      return []
    }
    if (!filters.state && filters.name && filters.name.length === 2) {
      if (this.statesMap[filters.name.toUpperCase()]) {
        return this.statesMap[filters.name.toUpperCase()].slice(0, limit)
      }
    }

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
