import { Schema,model } from "mongoose";

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        default: "free"
    },
    currency: {
        type: String,
        default: "GHS"
    },
    dressCode: {
        type: String
    },
    type: {
        type: String,
        enum: ["religious", "political", "entertainment"]
    }
}, {timestamps: true})

export const Events = model('Event', eventSchema)