const mongoose= require("mongoose")
var Schema= mongoose.Schema;

const foodItemSchema = new Schema({
    name:String,
    dateOfPurchase:Date,
    expiryDate:Date,
})

const foodItem=mongoose.model("foodItems",foodItemSchema)
module.exports=foodItem;  