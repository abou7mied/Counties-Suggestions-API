import { injectable } from 'inversify'
import { ICountySuggestion, ICountySuggestionDAL } from './interfaces'
import counties from './data/counties.json'

@injectable()
export default class StaticCountySuggestionDAL implements ICountySuggestionDAL {
  async findMatches (filters: Partial<ICountySuggestion>): Promise<ICountySuggestion[]> {
    if (typeof filters.name === 'undefined' && filters.state === undefined) {
      return []
    }
    const results = []
    for (const county of counties) {
      if (results.length < 5) {
        let matched = false
        if (filters.name !== undefined) {
          if (filters.name.length === 2 && filters.state === undefined) {
            matched = county.state.toLowerCase() === filters.name
          } else {
            matched = county.name.toLowerCase().match(filters.name) !== null
            if (filters.state === undefined) {
              matched ||= county.state.toLowerCase().match(filters.name) !== null
            }
          }
        }
        if (filters.state !== undefined) {
          matched &&= county.state.toLowerCase().match(filters.state) !== null
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
