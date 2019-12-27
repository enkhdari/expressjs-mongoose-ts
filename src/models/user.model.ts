import mongoose from 'mongoose'

export const NAME = 'User'

const UserSchema = new mongoose.Schema({
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  infoId: { type: mongoose.Types.ObjectId, ref: 'Person' },
  createdAt: Date,
  updatedAt: Date
})

export default mongoose.model(NAME, UserSchema, NAME.toLowerCase())