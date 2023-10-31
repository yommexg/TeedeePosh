const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  profileImg: {
    data: Buffer,
    contentType: String,
  },

  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: Number,
  },

  password: {
    type: String,
    required: true,
  },

  refreshToken: [String],

  createdAt: { type: Date, default: Date.now },

  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("User", userSchema);
