export interface ICountySuggestion {
  fips: string
  state: string
  name: string
}

export interface ICountySuggestionController {
  getSuggestions: (query: string) => Promise<any>
}

export interface ICountySuggestionService {
  getSuggestions: (query: string) => Promise<any>
}

export interface IFindMatchesOptions {
  limit: number
}

export interface ICountySuggestionDAL {
  findMatches: (filters: Partial<ICountySuggestion>, options?: IFindMatchesOptions) => Promise<ICountySuggestion[]>
}
