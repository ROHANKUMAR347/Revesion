const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: "FavoriteCountry" }],
  searchHistory: [{ type: String }],
});

module.exports = mongoose.model("User", userSchema);
