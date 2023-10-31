const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },

  discount: {
    type: String,
    required: true,
  },

  largeText1: {
    type: String,
    required: true,
  },

  largeText2: {
    type: String,
    required: true,
  },

  largeText2: {
    type: String,
    required: true,
  },

  saleTime: {
    type: String,
    required: true,
  },

  smallText: {
    type: String,
    required: true,
  },

  midText: {
    type: String,
    required: true,
  },

  buttonText: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  bannerImg: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
