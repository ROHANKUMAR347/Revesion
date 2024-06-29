const FavoriteCountry = require("../Models/FavoriteCountry");
const User = require("../Models/User");

exports.addFavoriteCountry = async (req, res) => {
  const { countryName, countryCode } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    const newFavorite = new FavoriteCountry({
      userId: user._id,
      countryName,
      countryCode,
    });
    await newFavorite.save();
    user.favorites.push(newFavorite);
    await user.save();
    res.status(201).json({ message: "Favorite added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("favorites");
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
