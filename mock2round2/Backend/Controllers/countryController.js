// server/controllers/countryController.js
const axios = require("axios");
// fetch country data
exports.getCountryByCurrency = async (req, res) => {
  const { currencyCode } = req.params;

  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/currency/${currencyCode}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
