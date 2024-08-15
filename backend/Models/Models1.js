const { Schema, model } = require('mongoose')

const FoodSchema = new Schema({

    name: { type: String },
    price :{type:Number},
    quantity: { type: Number },
    Image:{type:String}
})

module.exports = model('food', FoodSchema)