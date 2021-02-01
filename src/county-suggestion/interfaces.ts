import { Document } from 'mongoose'

export interface ICountySuggestion {
  fips: string
  state: string
  name: string
}

export interface ICountySuggestionController {
  getSuggestions: (query: string) => Promise<ICountySuggestion[]>
}

export interface ICountySuggestionService {
  getSuggestions: (query: string) => Promise<ICountySuggestion[]>
}

export interface IFindMatchesOptions {
  limit: number
}

export interface ICountySuggestionDAL {
  findByState: (state: string, options?: IFindMatchesOptions) => Promise<ICountySuggestion[]>
  findMatches: (filters: Partial<ICountySuggestion>, options?: IFindMatchesOptions) => Promise<ICountySuggestion[]>
}

export namespace DatabaseModels {
  export interface CountySuggestion extends ICountySuggestion, Document {
  }
}
