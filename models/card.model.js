const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cardSchema = new Schema({
    name: String,
    colors: [String],
    mana: String,
    rules: Array,
    img: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

const Card = mongoose.model("Card", cardSchema)

module.exports = Card