import mongoose from 'mongoose'

const Schema = mongoose.Schema

const personSchema = new Schema({
    name: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
  });

export let Person = mongoose.model("Person", personSchema)