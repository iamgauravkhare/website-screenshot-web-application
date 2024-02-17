const mongoose = require("mongoose");

const screenshotSchema = new mongoose.Schema({
  websiteLink: {
    type: String,
  },
  screenshotLink: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("screenshot", screenshotSchema);
