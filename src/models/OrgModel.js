import mongoose from 'mongoose'

const Schema = mongoose.Schema

let OrgSchema = new Schema({
    name: String,
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Org"
    },
    children: [{
        type: Schema.Types.ObjectId,
        ref: "Org"
    }]
    
})

export let Org = mongoose.model("Org", OrgSchema)