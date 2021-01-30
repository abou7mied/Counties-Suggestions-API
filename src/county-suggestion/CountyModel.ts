import mongoose from 'mongoose'
import { DatabaseModels } from './interfaces'

const { Schema } = mongoose

const invoiceSchema = new Schema({
  fips: String,
  state: String,
  name: String
})

invoiceSchema.index({
  fips: 1
})
invoiceSchema.index({
  state: 1
})
invoiceSchema.index({
  name: 1
})

export default mongoose.model<DatabaseModels.CountySuggestion>('County', invoiceSchema)
