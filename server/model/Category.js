const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },

  categoryImg: {
    data: Buffer,
    contentType: String,
    filename: String,
  },
});

module.exports = mongoose.model("Category", categorySchema);
