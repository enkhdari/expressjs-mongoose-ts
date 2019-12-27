import mongoose from 'mongoose'

export const NAME = 'Person'

const PersonSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: String,
  phone: String,
  createdAt: Date,
  createdBy: mongoose.Types.ObjectId,
  updatedAt: Date
})

export default mongoose.model(NAME, PersonSchema, NAME.toLowerCase())