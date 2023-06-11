const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, default: null },
  dateOfBirth: { type: Date, default: null },
  mobile: { type: Number},
  username: { type: String,unique: true },
  password:{type:String},
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);