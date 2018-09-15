var mongoose = require("mongoose");
var personSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  verified: { type: Boolean, default: false }
});
module.exports = mongoose.model("SignUp", personSchema);
