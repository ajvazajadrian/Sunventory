const mongoose= require("mongooose")
var Schema= mongoose.Schema;


const foodSchema = new Schema({
  name:String
})

const food  = mongoose.model("foods",foodSchema)
module.exports=food;  