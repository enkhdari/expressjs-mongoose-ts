import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
  email: { type: String, required: true },
  age: Number,
  firstName: String,
  lastName: String
})

export const Person = mongoose.model('Person', PersonSchema);