const mongoose = require("mongoose");

var Schema= mongoose.Schema;

var userSchema = new Schema(
  {
    username: String,
    password: String,
    foodItems: [{type:Schema.Types.ObjectId, ref: "foodItems"}]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
