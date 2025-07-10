const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true }, // URL or path to the image
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MenuItem", MenuSchema);
