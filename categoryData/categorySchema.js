var mongoose = require("mongoose");
var ctSchema = mongoose.Schema({
  category: { type: String, unique: true },
  img: String
});

module.exports = mongoose.model("categoryUpload", ctSchema);
