const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// model
const favoriteCountrySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  countryName: { type: String, required: true },
  countryCode: { type: String, required: true },
});

module.exports = mongoose.model("FavoriteCountry", favoriteCountrySchema);
