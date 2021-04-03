import mongoose from 'mongoose'

const Schema = mongoose.Schema

let CarSchema = new Schema({
    make: String,
    model: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    
})

//module.exports = mongoose.model("Car", CarSchema)
export let Car = mongoose.model("Car", CarSchema)