import mongoose from 'mongoose'
//import { Car } from './CarModel'

const Schema = mongoose.Schema

let UserSchema = new Schema({
    name: String,
    age: String,
    cars: [
        {
            type: Schema.Types.ObjectId,
            ref: "Car"
        }
    ]
})

//module.exports = mongoose.model("User", UserSchema)
export let User = mongoose.model("User", UserSchema)