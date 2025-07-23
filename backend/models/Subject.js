const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  attended: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

module.exports = mongoose.model("Subject", subjectSchema);
