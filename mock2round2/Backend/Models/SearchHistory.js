const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const searchHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  searchQuery: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SearchHistory", searchHistorySchema);
